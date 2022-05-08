import React, { useState, useEffect } from 'react';
import axios from 'axios';
import organizeReverseChronological from '../helpers/organizeReverseChronological';

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('idle');

  const fetchReposFromServer = () => {
    setLoadingStatus('loading');
    axios
      .get('http://localhost:4000/repos')
      .then((response) => {
        setLoadingStatus('succeeded');
        const data = organizeReverseChronological(response.data);
        setRepos(data);
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

      {/* Renders first repo to confirm data */}
      {repos.length > 0 && <p>{repos[0].name}</p>}
    </div>
  );
}
