/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { UserProvider } from '@auth0/nextjs-auth0';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';

import Navigation from '~/components/Navigation';

import SnackbarProvider from '~/providers/snackbar';

import theme from '~/theme';

export default function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  const { user } = pageProps;

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
        <title>Whats For Dinner</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider user={user}>
          <SnackbarProvider>
            <Box display="flex">
              <Navigation />
              <Box
                flexGrow={1}
                overflow="hidden"
                paddingTop={8}
                paddingBottom={7}
              >
                <Component {...pageProps} />
              </Box>
            </Box>
          </SnackbarProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
