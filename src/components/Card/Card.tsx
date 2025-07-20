// File: src/components/Card/Card.tsx
import { log } from '../../log';
import type { IItem } from '../../types/interfaces';
import styles from './Card.module.css';

const Card = ({ name, url }: IItem) => {
  // We extract the ID from the URL to have something to show besides the name.
  const id = url;
  // We capitalize the first letter of the name for better display.
  const capitalizedName = name ? name[0].toUpperCase() + name.slice(1) : 'N/A';
  log('Card: ', { id, capitalizedName });
  return (
    <tr className={styles.tableRow}>
      <td>{id}</td>
      <td>{capitalizedName}</td>
    </tr>
  );
};

export default Card;
