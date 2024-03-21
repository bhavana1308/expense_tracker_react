import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';
import Logout from './components/Logout';
import LogoutSuccess from './components/LogoutSuccess';
import ExpenseList from './components/ExpenseList';


function App() {
  return (
    <Routes>
       <Route path='/' element={<LandingPage />} />
      <Route path='/api/register' element={<Register />} />
      <Route path='/api/Login' element={<Login />} />
      <Route path="/api/expense/add" element={<AddExpense />} />
      <Route path="/api/expense/list" element={<ExpenseList/>}/>
      <Route path="/api/expense/edit/:expenseId" element={<EditExpense />} />
      <Route path='/api/logout' element={<Logout />} />
      <Route path='/api/logout-success' element={<LogoutSuccess />} />
     
     </Routes>
  );
}
export default App;