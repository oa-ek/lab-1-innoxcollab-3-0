import { useEffect } from 'react';
import { Container, ThemeProvider } from '@mui/material';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  const { commonStore, userStore, themeStore: { theme } } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent />


  return (
    <ThemeProvider theme={theme} >
      <ToastContainer position="bottom-right" theme="colored" />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container sx={{ mt: 10 }}>
            <Outlet />
          </Container>
        </>
      )}
    </ThemeProvider>
  )
}

export default observer(App);