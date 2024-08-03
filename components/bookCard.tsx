'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useColor } from 'color-thief-react';
import BuyLinks from './buyLinks';
import { BookDetailProps } from '@/utils/types';
import styles from '@/styles/bookCard.module.css';

export default function BookCard({
  rank,
  title,
  author,
  imgPath,
  buy_links,
}: BookDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fixedImgPath, setFixedImgPath] = useState('');
  const [isBright, setIsBright] = useState(false);
  const exceptForMeRef = useRef<HTMLButtonElement>(null);

  /**
1.이미지 요청 url을 next.cofig.js에서 rewrites 설정한대로 변경한다(fixedImagPath)
2. useColor hooks 사용
3. 받아온 data를 isColorBright이용해서 밝기 체크
4. retrun값으로 클래스 적용
 */
  useEffect(() => {
    const regex = /\/[^/]+\.jpg$/;
    const match = imgPath.match(regex);
    if (match) {
      setFixedImgPath(`/transform/${match[0]}`);
    }
  }, [imgPath, fixedImgPath]);

  const { data, loading } = useColor(fixedImgPath, 'hex', {
    // useColor(이미지url, 형식, 옵션{crossOrigin, quality})
    crossOrigin: 'Anonymous', // 이거 아무 쓸모 없어요
    quality: 40,
    /**
    quality: 1이면, 모든 픽셀을 샘플링, 속도 저하
    quality: 10이면, 10픽셀마다 하나의 픽셀을 샘플링, 속도 증가
     */
  });

  const isColorBright = (hexColor: string | undefined) => {
    if (hexColor === undefined) return false;
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness >= 155;
  };

  /**
isColorBright('#000')
brightness = 0 
isColorBright('#fff')
brightness = 255
밝기 값의 범위는 0부터 255까지입니다
0은 완전한 검정색을 의미하고,
255는 완전한 흰색을 의미합니다.
0부터255까지 중간값을 사용하지 않고 약간 높은 155를 사용하는지 gpt에게 물어보니 가독성을 보장하기 위해라고 합니다
 */

  useEffect(() => {
    setIsBright(isColorBright(data));
  }, [data]);

  useEffect(() => {
    const closeBuyLinkButton = (e: MouseEvent) => {
      if (
        exceptForMeRef.current &&
        !exceptForMeRef.current.contains(e.target as HTMLElement)
      ) {
        // console.log(e.target, e.currentTarget); // 둘이 다름
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeBuyLinkButton);
    return () => {
      document.removeEventListener('mousedown', closeBuyLinkButton);
    };
  }, []);

  const toggleBuyLinkButton = () => {
    setIsOpen((prev) => !prev);
  };

  if (loading) return null;
  return (
    <li className={styles.container} style={{ backgroundColor: data }}>
      <div className={styles.imgContainer}>
        <Image
          src={imgPath}
          alt={title}
          priority
          // width,height지정 안 하고 fill, sizes 지정 가능
          // 부모한테 꼭 position: relative;
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div
        className={`${
          isBright ? styles.fontColorBlack : styles.fontColorWhite
        } ${styles.infoContainer}`}
      >
        <h3 className={styles.bookTitle}>{title}</h3>
        <h4 className={styles.author}>{author}</h4>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.buttonCommon} ${styles.linkButton} ${
              isBright ? styles.linkButtonBlack : styles.linkButtonWhite
            }`}
            onClick={toggleBuyLinkButton}
            ref={exceptForMeRef}
          >
            BUY
            {isOpen ? (
              <BuyLinks backgroundColor={data} buy_links={buy_links} />
            ) : null}
          </button>
          {/* 좋아요 기능을 만들고 싶었지만 불가능
            <button type='button' className={styles.buttonCommon}>
              좋아요
            </button> */}
        </div>
      </div>
      <span className={styles.rankCircle}>{rank}</span>
    </li>
  );
}
