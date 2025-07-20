// File: src/components/CardList/CardList.tsx
import { log } from '../../log';
import type { IData } from '../../types/interfaces';
import Card from '../Card/Card';
import styles from './CardList.module.css';

const CardList = ({ items }: IData) => {
  log('Card: ', items);
  return (
    <tbody className={styles.list} data-testid='card-list-body'>
      {items.map((item) => (
        <Card key={item.url} url={item.url} name={item.name} />
      ))}
    </tbody>
  );
};

export default CardList;
