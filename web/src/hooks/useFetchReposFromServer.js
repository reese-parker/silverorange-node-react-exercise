import { useState, useEffect } from 'react';
import axios from 'axios';
import organizeReverseChronological from '../helpers/organizeReverseChronological';

export default function useFetchRepoData() {
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
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

  return { repos, languages, loadingStatus, fetchReposFromServer };
}
