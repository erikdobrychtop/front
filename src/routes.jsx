import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Posts from './views/Posts';
import Tags from './views/Tags';
import Register from './views/Register'; // Importar o componente Register

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/tags" element={<Tags />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;