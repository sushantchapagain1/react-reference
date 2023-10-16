/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // overriding the default configs.
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    // not overririding the default configs
    extend: {
      height: {
        // dvh -> dynamic viewport height solves the problem in mobile screens where height is not exactly screen on 100vh
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
