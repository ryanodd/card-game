/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Generate these easily at https://uicolors.app/

        "flush-mahogany": {
          50: "#fdf3f3",
          100: "#fce4e5",
          200: "#fbcdcf",
          300: "#f7aaad",
          400: "#f0797e",
          500: "#e54e55",
          600: "#c92c33",
          700: "#b0252b",
          800: "#922227",
          900: "#792327",
          950: "#420d0f",
        },
        shakespeare: {
          50: "#eefafd",
          100: "#d4f2f9",
          200: "#aee4f3",
          300: "#76cfea",
          400: "#48b8dc",
          500: "#1b95bf",
          600: "#1a77a0",
          700: "#1c6182",
          800: "#1f516b",
          900: "#1e435b",
          950: "#0e2b3e",
        },
        "de-york": {
          50: "#f3faf3",
          100: "#e3f5e4",
          200: "#c8eacb",
          300: "#9cd9a2",
          400: "#7cc784",
          500: "#44a34e",
          600: "#34853d",
          700: "#2b6a33",
          800: "#27542c",
          900: "#214626",
          950: "#0e2511",
        },

        lavender: {
          50: "#faf7fd",
          100: "#f3ecfb",
          200: "#e9ddf7",
          300: "#d7c2f0",
          400: "#bf9ae6",
          500: "#ab7cdb",
          600: "#8f55c8",
          700: "#7a42ae",
          800: "#683a8f",
          900: "#553073",
          950: "#381853",
        },
        "barley-corn": {
          50: "#f6f6f0",
          100: "#e9e9d8",
          200: "#d6d3b2",
          300: "#beb886",
          400: "#aaa065",
          500: "#a1945a",
          600: "#857649",
          700: "#6b5b3d",
          800: "#5c4d37",
          900: "#504333",
          950: "#2d241b",
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
