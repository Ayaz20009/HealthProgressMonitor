exports = async function(arg){
 
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "health_progress_monitor";
  var collName = "checkups_col";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  let results;
  
  try {
    
    query = [
      {
        $match: {
          patient_id: arg
        }
      }
      
    ];

    results = await collection.aggregate(query).toArray();
    

  } catch(err) {
    console.log("Error occurred while executing search query:", err.message);

    return { error: err.message };
  }

  return { result: results };
};