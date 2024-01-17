exports = async function(arg){
  // Define the OpenAI API url and key.
    const url = 'https://api.openai.com/v1/chat/completions';
    const openai_key = context.values.get("openAI_value");
    
    
    let results;
    
    console.log(arg);
  

    try {
        let messages = [
            { role: "system", content: "You're a Medical Professional. Here are the doctor's notes. Create a talk track in simple words to explain all the notes to a patient with next steps" },
            { role: "user", content: arg.queryObj }
        ];
        
        console.log(messages);
        
        if (arg.similarObjs) {
          arg.similarObjs.forEach(doc => {
            if (doc) {
                messages.push({ role: "user", content: doc });
            }
        });
        }
        

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
        return err;
    }
};