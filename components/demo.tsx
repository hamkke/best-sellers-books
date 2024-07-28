'use client';
import Color, { Palette } from 'color-thief-react';
import Image from 'next/image';
const Loading = () => <div>Loading...</div>;
export default function Demo() {
  const imgSrc = '/ing/9781250178633.jpg';

  const src = '/ing/9781250178633.jpg';
  return (
    <div className='App'>
      <Image src={src} alt='' width={100} height={200} priority />
      <Color src={imgSrc} crossOrigin='anonymous' format='hex'>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          return (
            <div>
              Predominant color: <strong>{data}</strong>
            </div>
          );
        }}
      </Color>
      <Palette src={imgSrc} crossOrigin='anonymous' format='hex' colorCount={4}>
        {({ data, loading }) => {
          if (loading) return <Loading />;
          return (
            <div>
              Palette:
              <ul>
                {data?.map((color, index) => (
                  <li key={index} style={{ color: color }}>
                    <strong>{color}</strong>
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Palette>
      {/* <img src={imgSrc} alt='' /> */}
    </div>
  );
}
