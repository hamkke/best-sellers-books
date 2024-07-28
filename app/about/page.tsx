import { Metadata } from 'next';
import styles from '@/styles/about.module.css';

export const metadata: Metadata = {
  title: 'about',
};

const About = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>（っ ‘ ᵕ ‘ ｃ）</h2>
      <p className={styles.p}>HELLOOOOOOOO</p>
    </div>
  );
};
export default About;
