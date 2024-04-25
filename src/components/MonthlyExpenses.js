import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Nav, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/MonthlyExpenses.css';

const MonthlyExpenses = () => {
  const { year } = useParams();
  const [totalExpense, setTotalExpense] = useState(null); // Initialize totalExpense as null
  const [activeMonth, setActiveMonth] = useState(1);
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchMonthlyTotalExpense(year, activeMonth);
  }, [year, activeMonth]);

  const fetchMonthlyTotalExpense = async (selectedYear, selectedMonth) => {
    try {
      const response = await request('GET', `/api/expenses/monthly?userId=${userId}&year=${selectedYear}&month=${selectedMonth}`);
      if (response.status === 200) {
        setTotalExpense(response.data.totalExpense);
      } else {
       console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleMonthClick = (selectedMonth) => {
    setActiveMonth(selectedMonth);
  };

  const months = [
    { name: 'January', number: 1 },
    { name: 'February', number: 2 },
    { name: 'March', number: 3 },
    { name: 'April', number: 4 },
    { name: 'May', number: 5 },
    { name: 'June', number: 6 },
    { name: 'July', number: 7 },
    { name: 'August', number: 8 },
    { name: 'September', number: 9 },
    { name: 'October', number: 10 },
    { name: 'November', number: 11 },
    { name: 'December', number: 12 },
  ];

  return (
    <div>
      <Navbar />
      <h1>Monthly Expenses for {year}</h1>
      
      <Nav variant="tabs">
        {months.map((month) => (
          <Nav.Item key={month.number}>
            <Nav.Link   onClick={() => handleMonthClick(month.number)} active={activeMonth === month.number} style={{ color: '#9b4922' }}>
              {month.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      
      <div className="card-container">
        <Card>
        <div className="card-item">
          <Card.Body>
            <Card.Title>Total Expense for {months.find(m => m.number === activeMonth).name}</Card.Title>
            <Card.Text>{JSON.stringify(totalExpense)}</Card.Text>
            <Link className='link' to={`/api/expenses/daily/${year}/${activeMonth}`}> View Expenses by Day </Link>
          </Card.Body>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyExpenses;
