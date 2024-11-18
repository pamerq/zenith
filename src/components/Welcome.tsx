import React from 'react';
import styles from '../styles/Welcome.module.scss';

const Welcome: React.FC = () => {
  return (
    <div className={styles.welcomeContainer}>
      <h1>Welcome!</h1>
    </div>
  );
};

export default Welcome;
