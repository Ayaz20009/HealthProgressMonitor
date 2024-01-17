exports = async function(arg) {
    // Define the OpenAI API url and key.
    const url = 'https://api.openai.com/v1/chat/completions';
    const openai_key = context.values.get("openAI_value");
    
    var serviceName = "mongodb-atlas";
    var dbName = "health_progress_monitor";
    var collName = "checkups_col";
  
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    
    let results;
  
    try {
        query = [{ $match: { patient_id: arg } }];
        results = await collection.aggregate(query).toArray();
    } catch(err) {
        console.log("Error occurred while executing search query:", err.message);
        return { error: err.message };
    }

    try {
        let messages = [
            { role: "system", content: "You're a Medical Professional. Here are the doctor's notes. Summarize them and provide an assessment of the patient's health status." },
        ];

        results.forEach(doc => {
            if (doc.doctor_notes) {
                messages.push({ role: "user", content: doc.doctor_notes });
            }
        });

        let response = await context.http.post({
            url: url,
            headers: {
                'Authorization': [`Bearer ${openai_key}`],
                'Content-Type': ['application/json']
            },
            body: JSON.stringify({ messages, model: "gpt-4" })
        });

        let responseData = EJSON.parse(response.body.text());

        if(response.statusCode === 200) {
            console.log(responseData.choices[0].message.content);
            return responseData.choices[0].message.content;
        } else {
            console.log(`Failed to receive response. Status code: ${response.statusCode}`);
             return `Failed to receive response. Status code: ${response.statusCode}`
        }
    } catch(err) {
        console.error(err);
    }
};
