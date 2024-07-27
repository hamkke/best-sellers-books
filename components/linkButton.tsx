import Link from 'next/link';
import styles from '@/styles/costans.module.css';

interface IButton {
  text: string;
  link?: string;
}

export default function LinkButton({ text, link }: IButton) {
  return (
    <Link href={`${link}`} className={styles.linkButton}>
      {text}
    </Link>
  );
}
