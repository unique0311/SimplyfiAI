import Layout from '@/components/Layout'
import { NotificationProvider } from '@/context/NotificationContext'
import { StateProvider } from '@/context/StateContext'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <StateProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </StateProvider>
    </NotificationProvider>
  )
}
