// File: src/components/Card/Card.tsx
import { log } from '../../log';
import type { IItem } from '../../types/interfaces';

const Card = ({ name, url }: IItem) => {
  // We extract the ID from the URL to have something to show besides the name.
  const id = url; //.split('/').filter(Boolean).pop() || 'N/A';
  // We capitalize the first letter of the name for better display.
  const capitalizedName = name ? name[0].toUpperCase() + name.slice(1) : 'N/A';
  log('Card: ', { id, capitalizedName });
  return (
    <tr>
      <td>{id}</td>

      <td>{capitalizedName}</td>
    </tr>
  );
};

export default Card;
