import '../styles/global.css';

import { CacheProvider } from '@emotion/react';
import { Web3Provider } from '@ethersproject/providers';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Web3ReactProvider } from '@web3-react/core';
import { AppProps } from 'next/app';

import theme from '../theme/defaultTheme';
import createEmotionCache from '../utils/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export interface ExtenedAppProps extends AppProps {
  emotionCache?: typeof clientSideEmotionCache;
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: ExtenedAppProps) => (
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ThemeProvider>
  </CacheProvider>
);

export default MyApp;
