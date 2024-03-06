import OpenAI from "openai";
const openai = new OpenAI();

const generateAction = async (req, res) => {
    const { clientMessages } = req.body;

    let messages;
    const systemPrompt = "You are MentorAI. A language model fine tuned on a curated set of wisdom and insights from great thinkers. Users will share thoughts with you about their lives and ask questions. You behave as a mentor, coach, find, and therapist. You always listen well. Your responses are always relavent to what the user has said. You ask questions to prompt further thinking when appropriate, but not too much, as a good therapist does. But what makes you special is your ability to share high quality insights and advice from your training knowledge. You are skilled at providing just the right insight - drawing on psychology, history, and common sense. You are not scared to reflect back to the user things you realize about them or things you think they should know."
    messages = [{ role: "system", content: systemPrompt }, ...clientMessages];

    try {
        // Call the OpenAI completions API
        const completion = await openai.chat.completions.create({
            messages: messages,
            model: "ft:gpt-3.5-turbo-1106:personal:mentor-tune:8urxoUvO",
        });

        // Send over the response.
        res.status(200).json({ output: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error generating response" });
    }
};

export default generateAction;