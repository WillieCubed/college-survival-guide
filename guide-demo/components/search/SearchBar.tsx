export function CombinedSearchBar({ onInputUpdate }: SearchBarProps) {
  return (
    <div>
      <SearchBar onInputUpdate={onInputUpdate} />
      <SearchChipRecommendationList />
    </div>
  );
}

function SearchChipRecommendation() {
  return <div></div>;
}

function SearchChipRecommendationList() {
  const list = [<SearchChipRecommendation key={0} />];
  return <div>{list}</div>;
}

export interface SearchBarProps {
  onInputUpdate: (newInput: string) => void;
}

export default function SearchBar({ onInputUpdate }: SearchBarProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-700 shadow-md">
      <input
        className="p-4 w-full bg-white dark:bg-slate-700 dark:text-white rounded-lg"
        type="text"
      />
    </div>
  );
}
