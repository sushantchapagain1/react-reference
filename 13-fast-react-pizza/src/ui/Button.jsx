import { Link } from 'react-router-dom';

function Button({ disabled, children, to, type, onClick }) {
  const base = `text-sm inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide 
  text-stone-800 transition-colors duration-100 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring
  focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed `;

  const styles = {
    primary: base + 'px-3 py-3 md:px-4',
    small: base + 'py-2 px-2.5 text-xs md:px-4 md:py-2.5',
    round: base + 'py-1 px-2.5',
    secondary: `px-2.5 py-2.5 inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide 
    text-stone-400 transition-colors duration-100 hover:bg-stone-300 hover:text-stone-500 focus:bg-stone-300 focus:outline-none focus:ring
    focus:ring-stone-400 focus:ring-offset-2 disabled:cursor-not-allowed md:px-4`,
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
