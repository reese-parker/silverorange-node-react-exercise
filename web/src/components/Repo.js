import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function Repo({ repo }) {
  const [showModal, setShowModal] = useState(false);
  const [readMeMarkdown, setReadMeMarkdown] = useState(null);

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
    <div>
      {/* Main repo info container */}
      <div onClick={() => setShowModal(!showModal)}>
        <p>{repo.name}</p>
        <p>{repo.created_at}</p>
        <p>{repo.description}</p>
        <p>{repo.language}</p>
        <p>{repo.forks_count}</p>
        {!showModal && <p>Click for more info</p>}
      </div>

      {/* Modal container */}
      {showModal && (
        <div>
          <button onClick={() => setShowModal(false)}>Close more info</button>
          <p>Most recent commit</p>
          <p>Commit author</p>
          <p>Commit message</p>

          {readMeMarkdown ? (
            <div>
              <p>README</p>
              <ReactMarkdown>{readMeMarkdown}</ReactMarkdown>
            </div>
          ) : (
            <p>No README available</p>
          )}
        </div>
      )}
    </div>
  );
}
