const dotenv=require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const { GoogleGenAI } = require('@google/genai');

if (!apiKey) {
    // THROW: Crash the server if the necessary configuration is missing
    throw new Error("FATAL ERROR: GEMINI_API_KEY is not accessible in the AI utility module.");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

const prompt=`You are an expert Amazon listing copywriter and SEO specialist. 
Given the original listing fields below, produce:

1) "optimized_title": a single title (<=200 characters), keyword-rich, readable.
2) "optimized_bullets": an array of 5 concise bullet points (each 1-2 short sentences).
3) "optimized_description": a persuasive long-form description (3-5 short paragraphs) that avoids medical/illegal claims and follows Amazon policies.
4) "keywords": 3-5 short keyword phrases relevant to the product (comma-separated array).

**ENSURE ALL STRING VALUES ARE PROPERLY ESCAPED FOR JSON, ESPECIALLY DOUBLE QUOTES.** 

Return output strictly as JSON with those keys. Here are the original fields:

ORIGINAL_TITLE: "{original_title}"
ORIGINAL_BULLETS: {original_bullets_json}
ORIGINAL_DESCRIPTION: "{original_description}"

Product details / restrictions: don't claim unproven benefits. Use American English. Keep keywords natural. Generate bullets that are customer-focused (benefits + features).
`

async function generateOptimizedDescriptionAndKeywords({title, bullets, description}){
    const bullets_json=JSON.stringify(bullets);
    const filled_prompt=prompt
        .replace('{original_title}', title.replace(/"/g, '\\"'))
        .replace('{original_bullets_json}', bullets_json)
        .replace('{original_description}', description.replace(/"/g, '\\"'));

    try{
        const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: filled_prompt }] }
        ],
        config: {
            maxOutputTokens: 5000,
            // Ensure the model returns a valid JSON object as requested
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    optimized_title: { type: "string" },
                    optimized_bullets: { 
                        type: "array", 
                        items: { type: "string" } 
                    },
                    optimized_description: { type: "string" },
                    keywords: { type: "string" }
                },
                required: [
                    "optimized_title", 
                    "optimized_bullets", 
                    "optimized_description", 
                    "keywords", 
                ]
            }
        }
    });
    
    if (response && response.text) {
            return response.text;
        } else {
            // If the API returns a response object but no text, treat it as a failure
            console.error("Gemini API returned an empty response text.");
            throw new Error("AI response text was empty.");
        }

    }
    catch(err){
         const errorMessage = err.message || "Unknown API error occurred.";
         console.error("Gemini API Request Failed:", errorMessage); 
         throw new Error(`AI Generation Failed: ${errorMessage}`);
    }
}

module.exports={generateOptimizedDescriptionAndKeywords};