import BookCard from '@/components/bookCard';
import styles from '@/styles/listDetail.module.css';
import { API_URL } from '@/utils/constants';
import { BookData } from '@/utils/types';

interface IParams {
  params: { id: string };
}

export function generateMetadata({ params: { id } }: IParams) {
  return {
    title: id,
  };
}

async function getListDetail(id: string) {
  const response = await fetch(`${API_URL}/list?name=${id}`);
  return response.json();
}

export default async function ListDetail({ params: { id } }: IParams) {
  const {
    results: { books },
  } = await getListDetail(id);

  return (
    <div className={styles.ship}>
      <h2 className={styles.title}>{id}</h2>
      <ul className={styles.container}>
        {books.map((item: BookData, idx: number) => {
          return (
            <BookCard
              key={`${item.title}-${idx}`}
              rank={item.rank}
              title={item.title}
              author={item.author}
              imgPath={item.book_image}
              buy_links={item.buy_links}
            />
          );
        })}
      </ul>
    </div>
  );
}
