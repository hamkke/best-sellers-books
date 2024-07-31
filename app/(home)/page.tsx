import { Metadata } from 'next';
import LinkButton from '@/components/linkButton';
import { CategoriesResult } from '@/utils/types';
import { API_URL } from '@/utils/constants';
import styles from '@/styles/home.module.css';

export const metadata: Metadata = {
  title: 'home',
};

const getBookList = async () => {
  const response = await fetch(`${API_URL}/lists`);
  return response.json();
};

export default async function Home() {
  const { results } = await getBookList();
  return (
    <div className={styles.ship}>
      <h2 className={styles.title}>What are you looking for?</h2>
      <ul className={styles.container}>
        {results.map((item: CategoriesResult, idx: number) => {
          return (
            <li key={`${idx}${item.display_name}`}>
              <LinkButton
                text={item.display_name}
                link={`/list/${item.list_name_encoded}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
