import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        yellow: '#FFD700',
        gray: '#808080',
      },
      scale: {
        130: '1.35',
        140: '1.4',
      },
      // backgroundColor: {
      //  gray: '#000000',
      // },
    },
  },
  plugins: [],
};
export default config;
