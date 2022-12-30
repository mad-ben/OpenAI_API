import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from 'openai';

dotenv.config(); // make use of dot env

//Debug API Key. Put .env file into server folder
//console.log(process.env.OPENAI_API_KEY)

/* creates open ai configuration based on API key*/ 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

/* creates open ai instance*/ 
const openai = new OpenAIApi(configuration);

/* initialize application using express*/ 
const app = express();
app.use(cors()); // use cors
app.use(express.json()); // allow to pass json from frontend to backend
app.get('/', async (req,res)=>{
    res.status(200).send({
        message: 'Hello from Jericho',
    })
})

app.post('/', async (req,res) => {
    try {
        const prompt = req.body.prompt;
        const aimodel = req.body.model;

        const temp = Number(aimodel.temperature);
        const maxTokens = Number(aimodel.max_tokens);
        const topP = Number(aimodel.top_p);
        const fPen = Number(aimodel.frequency_penalty);
        const pPen = Number(aimodel.presence_penalty);

        const response = await openai.createCompletion({
            model: `${aimodel.model}`,
            prompt: `${prompt}`,
            temperature: temp,
            max_tokens: maxTokens,
            top_p: topP,
            frequency_penalty: fPen,
            presence_penalty: pPen,
            stop: `${aimodel.stop}`,
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));