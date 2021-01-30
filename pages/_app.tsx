/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { wrapper } from '~/state/index';

import theme from '~/theme';

export default wrapper.withRedux(function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Whats for dinner</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex">
          <Box flexGrow={1} overflow="hidden" paddingTop={14} paddingBottom={7}>
            <Container maxWidth="xl">
              <Component {...pageProps} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
});
