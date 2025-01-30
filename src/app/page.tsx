'use client';
import { GridBackground } from '@/app/components/GridBackground';
import { useId, useState } from 'react';
import { Board } from './components/Board';
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { CheatSheetContextProvider } from './contexts/cheatsheets';
import { ExportJsonButton } from './components/ExportJsonButton';
import { Card, Select, Text } from '@radix-ui/themes';

interface PageTypeOptions {
  [k: string]: {
    description: string;
    width: string;
    height: string;
  };
}

const PageTypes: PageTypeOptions = {
  'a4-landscape': {
    description: 'A4 - Landscape',
    width: '297mm',
    height: '210mm',
  },
  'a4-portrait': {
    description: 'A4 - Portrait',
    width: '210mm',
    height: '297mm',
  },
};

export default function Home() {
  const wrapperId = useId();
  const boardId = useId();
  const [pageType, setPageType] =
    useState<keyof PageTypeOptions>('a4-landscape');

  const handlePageChange = (value: string) => {
    setPageType(value);
  };

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

      <CheatSheetContextProvider>
        <main className="flex flex-1 flex-row justify-center gap-8">
          <div className="align-center flex flex-1 flex-row items-center justify-center">
            <Board
              id={boardId}
              style={{
                width: PageTypes[pageType].width,
                height: PageTypes[pageType].height,
              }}
            >
              <GridBackground
                elementId={boardId}
                size={16}
                stops={4}
                primaryColor={'#00000033'}
                secondaryColor={'#00000011'}
                dotColor={'#0000000f'}
              />
            </Board>
          </div>
          <div className="no-print flex flex-1 flex-col pt-10">
            <Card className="min-w-[250px] shadow-lg">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                  <Text as="label" size="1">
                    Page configuration
                  </Text>
                  <Select.Root
                    size="1"
                    defaultValue="a4-landscape"
                    onValueChange={handlePageChange}
                  >
                    <Select.Trigger variant="surface" />
                    <Select.Content>
                      {Object.entries(PageTypes).map(([key, value]) => (
                        <Select.Item key={key} value={key}>
                          {value.description}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </div>
                <ExportJsonButton />
              </div>
            </Card>
          </div>
        </main>
      </CheatSheetContextProvider>
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
