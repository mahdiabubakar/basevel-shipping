module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      light: '#f4f4f4',
      white: '#ffffff',
      primary: '#6c63ff',
      midnight: '#121063',
      secondary: '#3f3d56',
      success: '#60be87',
      danger: '#d66969',
      rating: '#ff9529',
      gray: '#9ca3af',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
