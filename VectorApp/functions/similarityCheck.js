exports = async function(note){
  
  var serviceName = "mongodb-atlas";
  let date;
  
  // Update these to reflect your db/collection
  var dbName = "health_progress_monitor";
  var collName = "checkups_col";

  // Get a collection from the context
  var checkups_col = context.services.get(serviceName).db(dbName).collection(collName);
  
  var patient_id = Math.floor(Math.random() * 10000) + 1;
  
  
 
  // Call the zendesk api
  try {

      // Log this operation in the db log
      date = new Date();
      await checkups_col.insertOne({patient_id: patient_id, doctor_notes:  note})
      

  } catch(err) {
    console.log("Error occurred", err.message);
    return { status:500, error: err.message };
  }
  
  console.log(patient_id);
  
  var embedding_doc = [
  {
    '$match': {
      'patient_id': "002"
    }
  }, {
    '$project': {
      'doctor_notes_embedding': 1, 
      '_id': 0
    }
  }
]

  var doc = await checkups_col.aggregate(embedding_doc).toArray();
  
  
  
  if (doc.length > 0) {
      console.log(doc[0].doctor_notes_embedding);
    } else {
      console.log("No matching documents found");
    }
    
    console.log(doc[0].doctor_notes_embedding)

  
  cursor = checkups_col.aggregate([
    {
        "$vectorSearch": {
          queryVector: doc[0].doctor_notes_embedding,
          path: "doctor_notes_embedding",
          numCandidates: 100,
          index: "doctor_notes_index",
          limit: 6
        }
    }
  ])
  
  return cursor.toArray();


};