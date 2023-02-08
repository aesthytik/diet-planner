/* eslint-disable import/no-extraneous-dependencies */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { Configuration, OpenAIApi } from 'openai';

type Data = {
  message: string;
  pointsOfInterestPrompt: unknown;
  diet: unknown;
};

// const GPT_KEY = process.env.GPT_API_KEY;

// const configuration = new Configuration({
//   apiKey: GPT_KEY,
// });

// // const openai = new OpenAIApi(configuration);

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${GPT_KEY}`,
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let age = 18;
  let gender = 'Male';
  let height = '172';
  let weight = '60';
  let goal = 'Bulk';
  if (req.body) {
    const body = JSON.parse(req.body);
    age = body.age;
    gender = body.city;
    height = body.height;
    weight = body.weight;
    goal = body.goal;
  }

  const basePrompt = `what is an ideal diet chart for ${age} year old ${gender} with height ${height} cm and weight ${weight} kgs for ${goal} based on meals in a day in form of markdown to be rendered in react?`;
  try {
    // // const response = await openai.createCompletion({
    // //   model: 'text-davinci-003',
    // //   prompt: basePrompt,
    // //   max_tokens: 550,
    // //   temperature: 0,
    // // });
    // const diet = await response.data;

    // const pointsOfInterestPrompt = `Extract the points of interest out of this text, with no additional words, separated by commas: ${diet.choices[0].text}`;

    res.status(200).json({
      message: 'success',
      pointsOfInterestPrompt: basePrompt,
      diet: 'Success',
    });
  } catch (err) {
    console.log('error: ', err);
    // res.status(500).json({ message: 'failure', pointsOfInterestPrompt: '', diet: 'Failed' });
  }
}
