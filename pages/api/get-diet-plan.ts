/* eslint-disable import/no-extraneous-dependencies */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  pointsOfInterestPrompt: unknown;
  diet: unknown;
};

const GPT_KEY = process.env.GPT_API_KEY;

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${GPT_KEY}`,
// };

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${GPT_KEY}`,
};

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
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: basePrompt,
        temperature: 0,
        max_tokens: 550,
      }),
    });
    const diet = await response.json();

    const pointsOfInterestPrompt = `Extract the points of interest out of this text, with no additional words, separated by commas: ${diet.choices[0].text}`;

    res.status(200).json({
      message: 'success',
      pointsOfInterestPrompt,
      diet: diet.choices[0].text,
    });
  } catch (err) {
    console.log('error: ', err);
  }
}
