import { useRouter } from 'next/router';
import React from 'react';

export function CombinedSearchBar({ onInputUpdate, onSearch, currentQuery, results }: SearchBarProps) {
  return (
    <div>
      <SearchBar onInputUpdate={onInputUpdate} onSearch={onSearch} currentQuery={currentQuery} results={results} />
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

/**
 * Data fetched whenever a search query is fired.
 */
export type SearchQuery = {
  /**
   * The plain text of the query.
   */
  text: string;
  /**
   * A knowledge graph item in the CMS.
   * 
   * Whenever a rich result is clicked, this will be defined.
   */
  graphId?: string;
};

type TextSuggestion = {
  content: string;
  extraInfo?: string;
  iconUrl?: string;
};

type KnowledgeGraphSuggestion = {
  id: string;
  info: string;
  imageUrl?: string;
};

export type AutocompleteResults = {
  textSuggestions: TextSuggestion[];
  knowledgeGraphSuggestions: KnowledgeGraphSuggestion[];
};

export interface SearchBarProps {
  onInputUpdate: (newInput: string) => void;
  onSearch: (query: SearchQuery) => void;
  results: AutocompleteResults;
  currentQuery: string;
}

const DEBOUNCE_TIMEOUT = 250; // Milliseconds

/**
 * A custom hook for managing state for SearchBar and its derivatives.
 */
export function useSearchBar() {
  const [currentQuery, setCurrentQuery] = React.useState('');
  const [results, setResults] = React.useState<AutocompleteResults>({
    textSuggestions: [],
    knowledgeGraphSuggestions: [],
  });

  const router = useRouter();

  function handleAutocomplete(): AutocompleteResults {
    const results = {
      textSuggestions: [],
      knowledgeGraphSuggestions: [],
    };
    return results;
  }

  function handleSearch(query: SearchQuery) {
    // Make request, redirect
    const params = new URLSearchParams({
      q: query.text,
    });
    const route = `/search?${params}`;
    router.push(route);
  }

  function handleInputUpdate(newInput: string) {
    setCurrentQuery(newInput);
    // TODO: Use debouncing
  }

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      const autocompleteResults = handleAutocomplete();
      setResults(autocompleteResults);
    }, DEBOUNCE_TIMEOUT);
    return () => {
      clearTimeout(debounce);
    }
  }, [currentQuery]);

  return {
    currentQuery,
    results: results,
    handleInputUpdate: handleInputUpdate,
    handleSearch: handleSearch,
  };
}

export default function SearchBar({ onInputUpdate, onSearch, currentQuery }: SearchBarProps) {
  const triggerTextSearch = () => {
    onSearch({
      text: currentQuery,
    });
  }
  return (
    <div className="my-2 rounded-lg bg-white dark:bg-slate-700 transition-all ease-in-out hover:shadow-md">
      <input
        className="p-3 w-full bg-white dark:bg-slate-700 dark:text-white rounded-lg"
        type="text"
        placeholder='Search for anything.'
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onInputUpdate(event.currentTarget.value);
        }}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === 'Enter') {
            triggerTextSearch()
          }
        }}
        onSubmit={triggerTextSearch}
      />
    </div>
  );
}
