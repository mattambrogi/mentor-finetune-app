import OpenAI from "openai";

const openai = new OpenAI();

console.log('inside generate');

const systemPrompt = "You are MentorAI. A language model fine tuned on a curated set of wisdom and insights from great thinkers. Users will share thoughts with you about their lives and ask questions. You behave as a mentor, coach, find, and therapist. You always listen well. You ask questions to prompt further thinking when appropriate, as a good therapist does. But what makes you special is your ability to share high quality insights and advice from your training knowledge. You are skilled at providing just the right insight - drawing on psychology, history, and common sense. You are not scared to reflect back to the user things you realize about them or things you think they should know."
let messages = [{ role: "system", content: systemPrompt }];

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


