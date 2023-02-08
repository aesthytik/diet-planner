/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';

export default function Home() {
  const [request, setRequest] = useState<{
    age?: string;
    gender?: string;
    weight?: string;
    height?: string;
    goal?: string;
  }>({
    age: '20',
    gender: 'Male',
    weight: '60',
    height: '172 cm',
  });
  const [diet, setDiet] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  async function hitAPI() {
    try {
      if (!request.age || !request.goal) return;
      setMessage('Preparing Diet Plan...');
      setLoading(true);
      setDiet('');

      setTimeout(() => {
        setMessage('Personalizing diet...');
      }, 7000);

      setTimeout(() => {
        setMessage('Almost done...');
      }, 15000);

      const response = await fetch('/api/get-diet-plan', {
        method: 'POST',
        body: JSON.stringify({
          age: request.age,
          gender: request.gender,
          weight: request.weight,
          height: request.height,
          goal: request.goal,
        }),
      });
      const json = await response.json();
      const { diet: dietValue } = json;
      setDiet(dietValue?.choices[0].text);
      setLoading(false);
    } catch (e) {
      setDiet('Something went wrong!');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative bg-[url(https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/90 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/40" />
      <div className="w-full md:px-16 relative grid grid-cols-1 md:grid-cols-2 md:gap-32 px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="text-center sm:text-left md:w-1/2">
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-3">
            Get your diet plan
            <strong className="block font-extrabold text-rose-700">in seconds by AI.</strong>
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 justify-start">
            <div className="pt-0 col-span-3 md:col-span-1">
              <input
                type="text"
                className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                placeholder="Age"
                onChange={(e) =>
                  setRequest((req) => ({
                    ...req,
                    age: e.target.value,
                  }))
                }
              />
            </div>
            <div className="pt-0 col-span-3 md:col-span-1">
              <input
                type="text"
                className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                placeholder="Height in cms"
                onChange={(e) =>
                  setRequest((req) => ({
                    ...req,
                    height: e.target.value,
                  }))
                }
              />
            </div>
            <div className="pt-0 col-span-3 md:col-span-1">
              <input
                type="text"
                className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                placeholder="Weight in Kilograms"
                onChange={(e) =>
                  setRequest((req) => ({
                    ...req,
                    weight: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-3 pt-0 col-span-3">
              <input
                placeholder="Write your goal. For example, Bulking"
                className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
                onChange={(e) =>
                  setRequest((req) => ({
                    ...req,
                    goal: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-center mb-6">
            <button
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              type="button"
              onClick={hitAPI}
              disabled={loading}
            >
              {loading ? 'Creating' : 'Create Diet Plan'}
            </button>
          </div>
        </div>
        <div className="sm:text-left md:w-1/2 h-full">
          <div className="bg-gray-200 w-full h-full rounded-md p-6 border-[2px] border-gray-300 overflow-scroll">
            {loading && <p className="text-gray-900">{message}</p>}
            {diet ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: (props) => (
                    // eslint-disable-next-line react/no-invalid-html-attribute
                    <a target="_blank" rel="no-opener noreferrer" href={props.href}>
                      {props.children}
                    </a>
                  ),
                  p: (props) => <p className="text-gray-900">{props.children}</p>,
                  h1: (props) => <h1 className="text-gray-900 text-lg mb-4">{props.children}</h1>,
                  h2: (props) => <h2 className="text-gray-900 text-lg">{props.children}</h2>,
                  ul: (props) => <ul className="mb-3">{props.children}</ul>,
                  li: (props) => (
                    <li className="flex items-center text-gray-600 text-md">
                      <span className="mr-2">
                        <BsArrowRightCircleFill color="black" />
                      </span>
                      {props.children}
                    </li>
                  ),
                }}
              >
                {diet}
              </ReactMarkdown>
            ) : (
              !loading && <p className="text-gray-400">Your results</p>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full py-3 bg-rose-600 flex justify-center items-center text-white">
        Built with <AiFillHeart color="black" size={20} className="mx-2" /> by{' '}
        <a
          href="https://twitter.com/aesthytik"
          target="_blank"
          className="text-white ml-2"
          rel="noreferrer"
        >
          @aesthytik
        </a>
      </div>
    </section>
  );
}
