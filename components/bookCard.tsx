'use client';

import Image from 'next/image';
import styles from '@/styles/bookCard.module.css';
import { BuyLink } from '@/utils/types';
import { useEffect, useRef, useState } from 'react';
import BuyLinks from './buyLinks';
import Color, { useColor } from 'color-thief-react';

interface BookDetailProp {
  rank: number;
  title: string;
  author: string;
  imgPath: string;
  buy_links: BuyLink[];
}

export default function BookCard({
  rank,
  title,
  author,
  imgPath,
  buy_links,
}: BookDetailProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [fixedImgSrc, setFixedImgSrc] = useState('');
  const [isBright, setIsBright] = useState(false);
  const exceptForMeRef = useRef<HTMLButtonElement>(null);

  const { data } = useColor(fixedImgSrc, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  });

  const changeBG = (hexColor: any) => {
    if (hexColor === undefined) return false;
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness < 155;
  };

  useEffect(() => {
    setIsBright(changeBG(data));
  }, [data]);

  console.log(isBright, 123123);
  useEffect(() => {
    const regex = /\/[^/]+\.jpg$/;
    const match = imgPath.match(regex);
    if (match) {
      setFixedImgSrc(`/transform/${match[0]}`);
    }
  }, [imgPath, fixedImgSrc]);

  useEffect(() => {
    const closeLinkButton = (e: MouseEvent) => {
      if (
        exceptForMeRef.current &&
        !exceptForMeRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeLinkButton);
    return () => {
      document.removeEventListener('mousedown', closeLinkButton);
    };
  }, []);

  const toggleLinkButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Color src={fixedImgSrc} crossOrigin='anonymous' format='hex'>
        {({ data, loading }) => {
          if (loading) return null;
          return (
            <li className={styles.container} style={{ backgroundColor: data }}>
              <div className={styles.imgContainer}>
                <Image
                  className=''
                  src={imgPath}
                  alt={title}
                  priority
                  // width,height지정 안 하고 fill, sizes 지정 가능
                  // 부모한테 꼭 position: relative;
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              {/* // ---------------- */}
              <div
                className={`${
                  isBright ? styles.fontColorWhite : styles.fontColorBlack
                } ${styles.infoContainer}`}
              >
                <h3 className={styles.bookTitle}>{title}</h3>
                <h4 className={styles.author}>{author}</h4>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.buttonCommon} ${styles.linkButton} ${
                      isBright ? styles.linkButtonWhite : styles.linkButtonBlack
                    }`}
                    onClick={toggleLinkButton}
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
              {/* // ---------------- */}
              <span className={styles.rankCircle}>{rank}</span>
            </li>
          );
        }}
      </Color>
    </>
  );
}
