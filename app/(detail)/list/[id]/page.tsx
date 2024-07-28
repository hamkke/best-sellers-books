import BookCard from '@/components/bookCard';
import styles from '@/styles/listDetail.module.css';
import { BookData } from '@/utils/types';

interface IParams {
  params: { id: string };
}
const API_URL = 'https://books-api.nomadcoders.workers.dev/list?name=';

export function generateMetadata({ params: { id } }: IParams) {
  return {
    title: id,
  };
}

async function getListDetail(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
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
