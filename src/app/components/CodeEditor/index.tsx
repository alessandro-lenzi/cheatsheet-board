'use client';

import { PrismEditor, Editor } from 'prism-react-editor';

import 'prism-react-editor/prism/languages/common';

import { useBracketMatcher } from 'prism-react-editor/match-brackets';
import { useHightlightBracketPairs } from 'prism-react-editor/highlight-brackets';
import {
  useHighlightMatchingTags,
  useTagMatcher,
} from 'prism-react-editor/match-tags';
import {
  useDefaultCommands,
  useEditHistory,
} from 'prism-react-editor/commands';
import {
  useHighlightSelectionMatches,
  useShowInvisibles,
} from 'prism-react-editor/search';
import { useCursorPosition } from 'prism-react-editor/cursor';
import { IndentGuides } from 'prism-react-editor/guides';

import 'prism-react-editor/search.css';
import 'prism-react-editor/invisibles.css';

import './layout.css';
import './scrollbar.css';
import './github-light.css';

import { MonaspaceKrypton } from '@/util/fonts';
import { TextareaHTMLAttributes } from 'react';

const Extensions = ({ editor }: { editor: PrismEditor }) => {
  useBracketMatcher(editor);
  useHightlightBracketPairs(editor);
  useTagMatcher(editor);
  useHighlightMatchingTags(editor);
  useDefaultCommands(editor);
  useEditHistory(editor);
  useHighlightSelectionMatches(editor);
  useCursorPosition(editor);
  useShowInvisibles(editor);

  return <IndentGuides editor={editor} />;
};

interface IProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  language?: string;
}

// Work around to make the custom font work properly
type TextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'className'
>;
const textareaProps = {
  className: MonaspaceKrypton.className,
} as TextAreaProps;

export function CodeEditor({ language, defaultValue, onChange }: IProps) {
  return (
    <Editor
      language={language ?? 'tsx'}
      value={defaultValue ?? ''}
      onUpdate={onChange}
      insertSpaces={false}
      lineNumbers={false}
      textareaProps={textareaProps}
      rtl={false}
    >
      {(editor) => <Extensions editor={editor} />}
    </Editor>
  );
}
