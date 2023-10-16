import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';

import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-3">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
