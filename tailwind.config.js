/* @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'inter-regular':['Inter-Regular', 'sans'],
        'inter-bold':['Inter-Bold', 'sans'],
        'inter-semibold':['Inter-SemiBold', 'sans'],
      },
    },
  },
  plugins: [],
};
