import { Router } from 'express';
import axios from 'axios';
import localRepoData from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');

  const apiRepoData = await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response) => response.data)
    .catch((err) => res.status(500).json(err));

  const aggregateRepoData = [...localRepoData, ...apiRepoData].filter(
    (repo) => !repo.fork
  );

  res.status(200).json(aggregateRepoData);
});
