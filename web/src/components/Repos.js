import React, { useState } from 'react';
import useFetchReposFromServer from '../hooks/useFetchReposFromServer';

import Repo from './Repo';

export default function Repos() {
  const [languageFilter, setLanguageFilter] = useState('all');
  const { repos, languages, loadingStatus, fetchReposFromServer } =
    useFetchReposFromServer();

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
              ? repos.map((repo) => <Repo key={repo.id} repo={repo} />)
              : repos.map(
                  (repo) =>
                    repo.language === languageFilter && (
                      <Repo key={repo.id} repo={repo} />
                    )
                )}
          </div>
        </>
      )}
    </div>
  );
}
