import "../styles/index.css";
import { ColorModeContext, useMode } from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "../components/layout/main";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoginLayout from "../components/layout/loginLayout"
import LandingLayout from "../components/layout/article";

function App({ Component, pageProps }) {
  const [theme, colorMode] = useMode();
  const router = useRouter();

  const getLayout = () => {
    if (router.pathname === '/login') {
      return <LoginLayout><Component {...pageProps}/></LoginLayout>;
    } else if (router.pathname === '/') {
      return <LandingLayout><Component {...pageProps} /></LandingLayout>;
    } else if (router.pathname === '/makeTenant') {
      return <LoginLayout><Component {...pageProps} /></LoginLayout>;
    } else {
      return <Layout><Component {...pageProps}/></Layout>;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout()}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
