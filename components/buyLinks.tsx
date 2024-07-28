import Link from 'next/link';
import styles from '@/styles/buyLinks.module.css';
import { BuyLink } from '@/utils/types';

interface BuyLinksProps {
  backgroundColor?: string;
  buy_links: BuyLink[];
}

export default function BuyLinks({
  buy_links,
  backgroundColor,
}: BuyLinksProps) {
  return (
    <ul
      className={styles.container}
      style={{ backgroundColor: backgroundColor }}
    >
      {buy_links.map((item) => {
        return (
          <li key={item.name} className={styles.list}>
            <Link href={item.url} className={styles.link} target='_blank'>
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
