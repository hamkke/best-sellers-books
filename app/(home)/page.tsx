import LinkButton from '@/components/linkButton';
import { Result } from '@/utils/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'home',
};
const API_URL = 'https://books-api.nomadcoders.workers.dev/lists';
const getBookList = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export default async function Home() {
  const { results } = await getBookList();
  return (
    <div>
      <ul>
        {results.map((item: Result, idx: number) => {
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
