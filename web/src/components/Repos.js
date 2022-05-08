import React, { useState, useEffect } from 'react';
import axios from 'axios';
import organizeReverseChronological from '../helpers/organizeReverseChronological';

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [languageFilter, setLanguageFilter] = useState('all');
  const [loadingStatus, setLoadingStatus] = useState('idle');

  const fetchReposFromServer = () => {
    setLoadingStatus('loading');
    axios
      .get('http://localhost:4000/repos')
      .then((response) => {
        setLoadingStatus('succeeded');
        const data = organizeReverseChronological(response.data);
        setRepos(data);

        // Creates new array with unique language values
        setLanguages([...new Set(data.map((repo) => repo.language))]);
      })
      .catch((err) => {
        setLoadingStatus('failed');
        return err;
      });
  };

  useEffect(() => {
    fetchReposFromServer();
  }, []);

  return (
    <div>
      <p>{loadingStatus}</p>

      {/* Renders retry button if get request fails */}
      {loadingStatus === 'failed' && (
        <button onClick={fetchReposFromServer}>Try again</button>
      )}

      {loadingStatus === 'succeeded' && (
        <>
          {/* Renders buttons from language array */}
          <div>
            <button onClick={() => setLanguageFilter('all')}>Show all</button>
            {languages.map((language) => (
              <button
                key={language}
                onClick={() => setLanguageFilter(language)}
              >
                {language}
              </button>
            ))}
          </div>

          {/* Renders repo names, filters if a language is selected */}
          <div>
            {languageFilter === 'all'
              ? repos.map((repo) => <p key={repo.id}>{repo.name}</p>)
              : repos.map(
                  (repo) =>
                    repo.language === languageFilter && (
                      <p key={repo.id}>{repo.name}</p>
                    )
                )}
          </div>
        </>
      )}
    </div>
  );
}
