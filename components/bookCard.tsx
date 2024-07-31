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

  const { data, loading } = useColor(fixedImgPath, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 1,
  });

  const isColorBright = (hexColor: string | undefined) => {
    if (hexColor === undefined) return false;
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
    return brightness >= 155;
  };

  useEffect(() => {
    setIsBright(isColorBright(data));
  }, [data]);

  useEffect(() => {
    const regex = /\/[^/]+\.jpg$/;
    const match = imgPath.match(regex);
    if (match) {
      setFixedImgPath(`/transform/${match[0]}`);
    }
  }, [imgPath, fixedImgPath]);

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
}
