import React, { useEffect } from 'react';
import axios from 'axios';

export default function Repos() {
  const fetchReposFromServer = () => {
    axios
      .get('http://localhost:4000/repos')
      .then((response) => response.data)
      .catch((err) => err);
  };

  useEffect(() => {
    fetchReposFromServer();
  }, []);

  return <div>Repos</div>;
}
