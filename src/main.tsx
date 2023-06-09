import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user.context';
import App from './App';
import { ToplistProvider } from './context/toplist.context';
import { WatchlistProvider } from './context/watchlist.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserProvider>
          <WatchlistProvider>
          <ToplistProvider>
          <App />
          </ToplistProvider>
          </WatchlistProvider>
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
