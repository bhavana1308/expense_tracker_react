import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LandingPage from './components/LandingPage';


function App() {
  return (
    <Routes>
       <Route path='/' element={<LandingPage />} />
      
      <Route path='/api/register' element={<Register />} />
      <Route path='/api/Login' element={<Login />} />
     </Routes>
  );
}
export default App;