import styles from '@/styles/statusPage.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Please wait a moment</h2>
    </div>
  );
}
