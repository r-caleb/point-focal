/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-blue": "#0d6efd",
        "app-dark-blue": "#3a72b8",
        "app-filter-blue": "rgba(22, 52, 116, 0.11)",
        "app-dark": "#565661",
        "app-gray": "#f2f2f2",
        "app-bg-gray": "#8c8c8c",
      },
    },
  },
  plugins: [],
};
