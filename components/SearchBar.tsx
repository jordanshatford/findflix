import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
  value?: string;
}

const SearchBar = ({ onSearch, value = '' }: Props) => {
  const [innerValue, setInnerValue] = useState<string>(value);
  return (
    <div className="px-0 py-2 flex justify-center">
      <div className="flex rounded-tl-lg rounded-bl-lg bg-zinc-700 p-1">
        <input
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && onSearch(innerValue)}
          onChange={(e) => setInnerValue(e.target.value)}
          value={innerValue}
          placeholder="Enter search term"
          className="flex rounded-lg bg-zinc-700 p-1 text-zinc-100 mx-0.5 p-2 text-base text-left outline-none"
        />
      </div>
      <button
        onClick={() => onSearch(innerValue)}
        className="bg-zinc-800 border rounded-tr-lg rounded-br-lg border-zinc-800 hover:bg-zinc-700"
      >
        <MagnifyingGlass size={25} className="my-auto mx-2 text-zinc-200" />
      </button>
    </div>
  );
};

export default SearchBar;
