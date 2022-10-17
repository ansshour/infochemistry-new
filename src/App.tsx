import { Suspense, useEffect, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { AppRoutes } from './components/AppRoutes';
import { useLocation } from 'react-router-dom';
import { Loader } from './components/UI/Loader/Loader';
import { AuthService } from './services/auth.service';
import { Loader2 } from './components/UI/Loader2/Loader2';
import { ToastContainer } from 'react-toastify';



function App() {

  const { pathname } = useLocation();
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      try {
        AuthService.refresh();
      } catch (err) {

      }
    }
  }, [])

  const render = () => {
    if (pathname.includes("auth") || pathname.includes("register") || pathname.includes("restore")) {
      return <AppRoutes />
    } else if (pathname.includes("online_lab") || pathname.includes("teacher_personal_account") || pathname.includes("createlab") || pathname.includes("settings") || pathname.includes("robo") || pathname.includes("projects")) {
      return (
        <>
          <Header />
          <AppRoutes />
        </>
      )
    } else {
      return (
        <>
          <div className="wrapperR">
            <Header />
            <div className="mainR">
              <AppRoutes />
            </div>
            <div className="footerR"><Footer /></div>
          </div>
        </>
      )
    }
  }

  return (
    <>
      <Suspense fallback={<></>}>
        <ToastContainer
          theme="colored"
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
        {render()}
      </Suspense>
    </>
  );
}

export default App;
