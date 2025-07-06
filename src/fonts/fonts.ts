import localFont from 'next/font/local';

export const sourceSansPro = localFont({
  src: [
    { path: './SourceCodePro-SemiBold.ttf', weight: '600' },
  ],
  variable: '--font-source-sans-pro',
});