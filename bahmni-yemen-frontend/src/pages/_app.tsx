import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { MainLayout } from '@/components/layout/MainLayout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
