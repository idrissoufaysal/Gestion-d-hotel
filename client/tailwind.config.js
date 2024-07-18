/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'couleur-principale': '#0f4c81',
        'gris-clair': '#EFEFEF',
        'vert-olive': '#47803d',
        'jaune-moutarde': '#D4A03A',
        'rouge-bordeaux': '#8B2635',
        'gris-sombre': '#808080',
        'bleu_clair': '#288fe9'
      }
    },
  },
  plugins: [],
}

