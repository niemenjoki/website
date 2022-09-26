import { useState } from 'react';

import useDebounce from '@/hooks/useDebounce';
import useToggle from '@/hooks/useToggle';
import classes from '@/styles/Search.module.css';
import Post from './Post';

const Search = ({ list, keys, placeholder, language }) => {
  list = list.map((post) => {
    if (!Array.isArray(post.tags)) post.tags = post.tags.split(',');
    if (!Array.isArray(post.keywords)) post.keywords = post.keywords.split(',');
    return post;
  });

  const [searchTerm, updateSearchTerm] = useState('');
  const [searchResults, updateSearchResults] = useState([]);
  const [searchResultsShown, toggleSearchResultsShown] = useToggle(false);
  useDebounce(() => search(searchTerm), 700, [searchTerm]);

  const search = async (pattern) => {
    const options = {
      includeScore: true,
      minMatchCharLength: 3,
      findAllMatches: true,
      ignoreLocation: true,
      keys,
    };

    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(list, options);
    const results = fuse.search(pattern);
    const relevantResultData = results
      .filter((result) => result.score < 0.8)
      .slice(0, 3)
      .map((result) => result.item);

    toggleSearchResultsShown(true);
    updateSearchResults(relevantResultData);
  };

  const handleInput = (e) => {
    updateSearchTerm(e.target.value);
  };

  return (
    <div className={classes.Search}>
      <div className={classes.Label}>
        {language === 'en' ? 'Search posts' : 'Etsi julkaisuja'}
      </div>
      <input
        onChange={handleInput}
        onFocus={() => toggleSearchResultsShown(true)}
        onBlur={() => {
          if (searchResults.length === 0) toggleSearchResultsShown(false);
        }}
        placeholder={placeholder}
        className={searchResultsShown ? classes.ResultsShown : undefined}
      />
      {searchResultsShown && (
        <div className={classes.Results}>
          <span
            className={classes.CloseButton}
            onClick={() => toggleSearchResultsShown(false)}
          >
            &times;
          </span>
          {searchResults.length > 0 ? (
            searchResults.map((result, i) => (
              <Post key={i} post={result} compact={true} />
            ))
          ) : (
            <div className={classes.NoResults}>
              {language === 'en' ? 'No results for:' : 'Ei tuloksia haulle:'}{' '}
              {searchTerm}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Search;
