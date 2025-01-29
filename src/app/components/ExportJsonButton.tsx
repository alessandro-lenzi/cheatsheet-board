import { Button } from '@headlessui/react';
import { useCheatSheetContext } from '../contexts/cheatsheets';

export const ExportJsonButton = () => {
  const { items } = useCheatSheetContext();

  const handleClick = () => {
    console.log('Export button clicked.');
    const json = JSON.stringify(items, null, 2);
    navigator.clipboard.writeText(json);
  };

  return (
    <Button
      className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-[active]:bg-sky-700 data-[hover]:bg-sky-500"
      onClick={handleClick}
    >
      Export JSON
    </Button>
  );
};
