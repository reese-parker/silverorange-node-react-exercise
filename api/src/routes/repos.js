import { Router } from 'express';
import axios from 'axios';

export const repos = Router();

repos.get('/', async (req, res) => {
  res.header('Cache-Control', 'no-store');

  const apiRepoData = await axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((response) => response.data)
    .catch((err) => res.status(500).json(err));

  res.status(200).json(apiRepoData);
});
