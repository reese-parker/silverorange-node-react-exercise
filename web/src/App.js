import React from 'react';
import Repos from './components/Repos';
import styles from './styles/AppStyles.module.css';

export function App() {
  return (
    <div className={styles.appContainer}>
      <h1>Repos</h1>
      <Repos />
    </div>
  );
}
