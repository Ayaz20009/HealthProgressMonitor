exports = async function(changeEvent) {
    // Get the full document from the change event.
    const doc = changeEvent.fullDocument;

    // Define the OpenAI API url and key.
    const url = 'https://api.openai.com/v1/embeddings';
    const openai_key = context.values.get("openAI_value");

    try {
        console.log(`Processing document with id: ${doc._id}`);

        // Iterate over each checkup to process doctor_notes
        for (const checkup of doc.checkups) {
            // Call OpenAI API to get the embeddings for doctor_notes.
            let response = await context.http.post({
                url: url,
                headers: {
                    'Authorization': [`Bearer ${openai_key}`],
                    'Content-Type': ['application/json']
                },
                body: JSON.stringify({
                    input: checkup.doctor_notes,
                    model: "text-embedding-ada-002"
                })
            });

            // Parse the JSON response
            let responseData = EJSON.parse(response.body.text());

            // Check the response status.
            if(response.statusCode === 200) {
                console.log("Successfully received embedding for doctor_notes.");

                const embedding = responseData.data[0].embedding;

                // Append the embedding to the checkup
                checkup.doctor_notes_embedding = embedding;
            } else {
                console.log(`Failed to receive embedding. Status code: ${response.statusCode}`);
            }
        }

        // Use the name of your MongoDB Atlas Cluster
        const collection = context.services.get("sahackathon").db("health_progress_monitor").collection("patient_history");

        // Update the document in MongoDB with new embeddings.
        const result = await collection.updateOne(
            { _id: doc._id },
            { $set: { checkups: doc.checkups }}
        );

        if(result.modifiedCount === 1) {
            console.log("Successfully updated the document with embeddings.");
        } else {
            console.log("Failed to update the document.");
        }

    } catch(err) {
        console.error(err);
    }
};
