import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import Logout from './components/Logout';
import LogoutSuccess from './components/LogoutSuccess';


function App() {
  return (
    <Routes>
       <Route path='/' element={<LandingPage />} />
      <Route path='/api/register' element={<Register />} />
      <Route path='/api/Login' element={<Login />} />
      <Route path='/api/logout' element={<Logout />} />
      <Route path='/api/logout-success' element={<LogoutSuccess />} />
     </Routes>
  );
}
export default App;