import LinkButton from './linkButton';
import styles from '@/styles/header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.listBox}>
          <li className={styles.list}>
            <LinkButton text='HOME' link='/' />
          </li>
          <li className={styles.list}>
            <LinkButton text='ABOUT' link='/about' />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
