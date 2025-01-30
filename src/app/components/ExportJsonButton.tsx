import { Button } from '@radix-ui/themes';
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
      variant="soft"
      // className="rounded bg-zinc-600 px-4 py-2 text-sm text-white transition-colors data-[active]:bg-zinc-700 data-[hover]:bg-zinc-500"
      onClick={handleClick}
    >
      Export JSON
    </Button>
  );
};
