import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mvp from './pages/mvp';
import Toplist from './pages/toplist'
import Navbar from "./components/navbar";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Mvp />}></Route>
        <Route path="/toplist" element={<Toplist />}></Route>
        <Route path="/watchlist" element={<Toplist />}></Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
