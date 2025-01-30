import { randomSid } from '@/util/random';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { boxes } from '../testSheets/stateful-stateless';

export interface ItemData {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  title?: string;
  content?: string;
  initialContent?: string;
  color?: string;
}

interface CheatSheetContextType {
  items: ItemData[];
  updateItem: (data: ItemData) => void;
  createItem: (data: Omit<ItemData, 'id'>) => void;
  deleteItem: (id: string) => void;
  debug: boolean;
}

interface CheatSheetContextProviderProps {
  debug?: boolean;
  children: ReactNode;
}

const CheatSheetContext = createContext<CheatSheetContextType>({
  items: [],
  createItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  debug: false,
});

export const CheatSheetContextProvider = ({
  debug = false,
  children,
}: CheatSheetContextProviderProps) => {
  const [items, setItems] = useState<ItemData[]>(boxes);

  const createItem = (item: Omit<ItemData, 'id'>) => {
    const newEntry = {
      id: randomSid(),
      ...item,
    };
    setItems((val) => val.concat(newEntry));
  };

  const updateItem = (newData: ItemData) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === newData.id) {
          return newData;
        }
        return item;
      })
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const values = useMemo(() => {
    return {
      items,
      createItem,
      updateItem,
      deleteItem,
      debug,
    };
  }, [items, debug]);

  return (
    <CheatSheetContext.Provider value={values}>
      {children}
    </CheatSheetContext.Provider>
  );
};

export const useCheatSheetContext = () => {
  const context = useContext(CheatSheetContext);
  if (!context) throw new Error('Context not properly set inside provider.');
  return context;
};
