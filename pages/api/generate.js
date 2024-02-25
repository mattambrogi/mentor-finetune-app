import OpenAI from "openai";

const openai = new OpenAI();

console.log('inside generate');

let messages = [{ role: "system", content: "You are a helpful assistant." }];

const generateAction = async (req, res) => {
    // Append user input to messages with role: "user"
    messages.push({ role: "user", content: req.body.userInput });

    try {
        // Call the OpenAI completions API
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "ft:gpt-3.5-turbo-1106:personal:mentor-tune:8urxoUvO",
        });

        console.log(completion.choices[0].message.content);

        // Append the assistant's response to messages
        if (completion.choices.length > 0 && completion.choices[0].message.content) {
            messages.push({ role: "assistant", content: completion.choices[0].message.content });
        }

        // Send over the response.
        res.status(200).json({ output: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error generating response" });
    }
};

export default generateAction;


