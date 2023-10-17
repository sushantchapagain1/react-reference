import { useSelector } from 'react-redux';
import { getUser } from './userSlice';

function Username() {
  const userName = useSelector(getUser);

  if (!userName) return null;

  return (
    <span className="hidden text-sm font-semibold md:block">{userName}</span>
  );
}

export default Username;
