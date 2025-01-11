'use client';
import { GridBackground } from '@/app/components/GridBackground';
import { useId } from 'react';
import { Board } from './components/Board';
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';

export default function Home() {
  const wrapperId = useId();
  const boardId = useId();

  return (
    <div
      id={wrapperId}
      className="flex h-[100vh] w-[100%] flex-col items-center justify-items-center gap-4 p-4 font-[family-name:var(--font-geist-sans)] print:p-0 print:pb-0"
    >
      {/* <GridBackground
        elementId={wrapperId}
        size={16}
        stops={4}
        primaryColor="#00000066"
        secondaryColor="#00000011"
        dotColor="#00000011"
      /> */}

      <main className="row-start-2 flex flex-1 flex-col justify-center gap-8 sm:items-start">
        <Board id={boardId} className="h-[210mm] w-[297mm]">
          <GridBackground
            elementId={boardId}
            size={16}
            stops={4}
            primaryColor={'#00000033'}
            secondaryColor={'#00000011'}
            dotColor={'#0000000f'}
          />
        </Board>
      </main>
      <footer className="no-print flex flex-wrap items-center justify-center justify-items-center gap-6 text-[0.8em] text-slate-700">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://alessandrolenzi.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Alessandro Lenzi
          <ExternalLinkIcon aria-hidden width={16} height={16} />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/alessandro-lenzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon aria-hidden width={16} height={16} />
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/alessandrolenzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLogoIcon aria-hidden width={16} height={16} />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
