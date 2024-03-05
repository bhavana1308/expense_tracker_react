import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Register from './components/Register';
import ParentLogin from './components/Login';


function App() {
  return (
    <Routes>
      
      <Route path='/api/register' element={<Register />} />
      <Route path='/api/parentLogin' element={<Login />} />
     </Routes>
  );
}
export default App;