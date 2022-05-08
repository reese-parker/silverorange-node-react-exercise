import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import styles from '../styles/RepoStyles.module.css';

export default function Repo({ repo }) {
  const [showModal, setShowModal] = useState(false);
  const [readMeMarkdown, setReadMeMarkdown] = useState(null);
  const createdDate = dayjs(repo.created_at).format('MMM-D-YYYY');
  const mostRecentUpdateDate = dayjs(repo.updated_at).format('MMM-D-YYYY');

  axios
    .get(`https://raw.githubusercontent.com/${repo.full_name}/master/README.md`)
    .then((response) => {
      setReadMeMarkdown(response.data);
    })
    .catch((err) => err);

  //   // BUG: Attempts to fetch comments, returns 404 error
  //   axios
  //     .get(repo.commits_url)
  //     .then((response) => response.data)
  //     .catch((err) => err);

  return (
    <div className={styles.repoContainer}>
      {/* Main repo info container */}
      <div
        onClick={() => setShowModal(!showModal)}
        className={styles.mainInfoContainer}
      >
        <p>Repo name: {repo.name}</p>
        <p>Created: {createdDate}</p>
        <p>Description: {repo.description}</p>
        <p>Language: {repo.language}</p>
        <p>Forks count: {repo.forks_count}</p>
        {!showModal && (
          <p className={styles.clickMessage}>Click for more info</p>
        )}
      </div>

      {/* Modal container */}
      {showModal && (
        <div className={styles.modalContainer}>
          <button onClick={() => setShowModal(false)}>Close more info</button>
          <p>Most recent commit: {mostRecentUpdateDate}</p>

          {readMeMarkdown ? (
            <div className={styles.readMeContainer}>
              <p>README</p>
              <ReactMarkdown className={styles.readMeMarkdown}>
                {readMeMarkdown}
              </ReactMarkdown>
            </div>
          ) : (
            <p>No README available</p>
          )}
        </div>
      )}
    </div>
  );
}
