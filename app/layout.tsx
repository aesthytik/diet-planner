/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import './globals.css';
import { DefaultSeo } from 'next-seo';
import { AnalyticsWrapper } from './components/analytics';
import SEO from '../next-seo.config';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <DefaultSeo {...SEO} />
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Diet Planner GPT</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Diet Planner GPT" />
        <meta name="keywords" content="Diet planner, AI Diet Planner" />
      </head>
      <body>
        <div className="bg-black">
          {children}
          <AnalyticsWrapper />
        </div>
      </body>
    </html>
  );
}
