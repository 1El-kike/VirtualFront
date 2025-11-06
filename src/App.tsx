import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToastProvider
          placement="top-right"
          toastProps={{
            shouldShowTimeoutProgress: true,
            timeout: 4000,
          }}
        />
        <HelmetProvider>
          <Outlet />
        </HelmetProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;

