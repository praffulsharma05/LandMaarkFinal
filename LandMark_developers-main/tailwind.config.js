/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        brown: '#A52A2A',
        'brown-dark': '#8B4513',
         blue:{900:   '#0a1f44'}, // your custom dark blue
        
      },
    },
  },
  plugins: [],
};
 