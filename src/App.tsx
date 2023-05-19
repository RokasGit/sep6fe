import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/user.context';
import Mvp from './pages/mvp';
import ActorPage from './pages/actor';
import Register from './pages/register';
import Toplist from './pages/toplist';
import Navbar from './components/navbar';
import Login from './pages/login';
import Profile from './pages/profile';
import MoviePage from './pages/movie';
import Watchlist from './pages/watchlist';
import FindUsers from './pages/find-users';

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Mvp />}></Route>
          <Route path="/toplist" element={<Toplist />}></Route>
          <Route path="/actors" element={<ActorPage />}></Route>
          <Route path="/find-users" element={<FindUsers />}></Route>
          <Route path="/watchlist" element={<Watchlist />}></Route>
          <Route path="/movie" element={<MoviePage />}></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile/:id" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
