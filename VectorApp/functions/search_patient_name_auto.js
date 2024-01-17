exports = async function(arg){
 
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "health_progress_monitor";
  var collName = "patients_col";
  var search_index = "search_patient_name_autocomplete";

  // Get a collection from the context
  var collection = context.services.get(serviceName).db(dbName).collection(collName);
  console.log(collection);
  let results;
  
  try {
    
    query = [
    {
      $search: {
        index: 'search_patient_name_autocomplete',
        autocomplete: {
          query: arg.searchTerm,
          path: 'name'
        }
      }
    }
  ]

    results = await collection.aggregate(query).toArray();
    

  } catch(err) {
    console.log("Error occurred while executing search query:", err.message);

    return { error: err.message };
  }

  return { result: results };
};