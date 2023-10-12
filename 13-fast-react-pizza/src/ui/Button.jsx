function Button({ disabled, children }) {
  return (
    <button
      disabled={disabled}
      className="inline-block rounded-full bg-yellow-400 px-3 py-3 font-semibold uppercase tracking-wide 
  text-stone-800 transition-colors duration-100 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring
  focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export default Button;
