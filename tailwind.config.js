/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1240px',
    },
    extend: {
      container: {
        center: true,
      },
      colors: {
        primary: '#3b82f6',
        secondary:'#34d399',
        thirdly:'#8b5cf6'
      },
      fontFamily: {
        inter: ['Inter, sans-serif'],
      },
      boxShadow: {
        form: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        tableBtn:
          'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;',
        card: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
        'profile-card':
          ' rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
        table:
          ' rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
