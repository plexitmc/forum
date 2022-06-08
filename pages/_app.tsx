import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import '../styles/globals.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withNormalizeCSS>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
    )
}

export default MyApp
