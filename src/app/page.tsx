import { GridBackground } from '@/app/components/GridBackground';
import { useId } from 'react';
import { Board } from './components/Board';

export default function Home() {
  const wrapperId = useId();
  const boardId = useId();

  return (
    <div id={wrapperId} className="h-[100%] w-[100%]">
      {/* <GridBackground
        elementId={wrapperId}
        size={16}
        stops={3}
        primaryColor="#ffffff22"
        secondaryColor="#33333333"
        dotColor="#ffffff11"
      /> */}

      <div className="items-center justify-items-center gap-4 p-20 pb-6 font-[family-name:var(--font-geist-sans)] print:p-0 print:pb-0">
        <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
          <Board id={boardId} className="h-[210mm] w-[297mm]">
            <GridBackground
              elementId={boardId}
              size={16}
              stops={3}
              primaryColor={'#00000033'}
              secondaryColor={'#00000011'}
              dotColor={'#0000000f'}
            />
          </Board>
        </main>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
          {/* <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a> */}
        </footer>
      </div>
    </div>
  );
}
