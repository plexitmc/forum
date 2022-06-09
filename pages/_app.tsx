import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/globals.css';
import type { AppProps } from 'next/app'

// DaysJS
import dayjs from 'dayjs';
require('dayjs/locale/en')

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('en')

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
