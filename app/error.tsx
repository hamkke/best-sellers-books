'use client';

import styles from '@/styles/statusPage.module.css';
import LinkButton from '@/components/linkButton';

export default function Error() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ㄱㅗ 장ㅇ ㅣ ㄴㅏ ㅆ 어요옹오오</h2>
      <LinkButton text='Go to Main' link='/' />
    </div>
  );
}
