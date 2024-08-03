import styles from '@/styles/statusPage.module.css';
import LinkButton from '@/components/linkButton';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Where am I...?</h2>
      <LinkButton text='Go to Main' link='/' />
    </div>
  );
}
