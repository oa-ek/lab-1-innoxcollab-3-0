import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import { ToastContainer } from 'react-toastify';
import { Container } from '@mui/material';
import HomePage from '../../features/home/HomePage';
import { observer } from 'mobx-react-lite';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent />
 
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? <HomePage /> : (
        <>
          <NavBar />
          <Container sx={{ mt: 10 }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default observer(App);
