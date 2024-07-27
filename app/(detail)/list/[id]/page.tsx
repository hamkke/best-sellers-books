interface IParams {
  params: { id: string };
}
const API_URL = 'https://books-api.nomadcoders.workers.dev/list?name=';

async function getListDetail(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export default async function ListDetail({ params: { id } }: IParams) {
  const {
    results: { books },
  } = await getListDetail(id);

  return (
    <div>
      {books.map((item: any, idx: number) => {
        return <h1 key={idx}>{item.title}</h1>;
      })}
    </div>
  );
}
