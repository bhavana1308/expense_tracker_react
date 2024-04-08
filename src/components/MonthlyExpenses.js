import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Nav } from 'react-bootstrap';

const MonthlyExpenses = () => {
  const { year } = useParams();
  const [expenses, setExpenses] = useState([]);
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchMonthlyExpenses(year, 1); // Fetch expenses for January by default
  }, [year]);

  const fetchMonthlyExpenses = async (selectedYear, selectedMonth) => {
    try {
      const response = await request('GET', `/api/expenses/monthly?userId=${userId}&year=${selectedYear}&month=${selectedMonth}`);
      if (response.status === 200) {
        setExpenses(response.data);
      } else {
        console.error('Failed to fetch monthly expenses');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleMonthClick = (selectedMonth) => {
    
    fetchMonthlyExpenses(year, selectedMonth);
  };

  // Function to generate tabs for each month
  const renderMonthTabs = () => {
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
      <Nav variant="tabs">
        {months.map((m, index) => (
          <Nav.Item key={index}>
            
            <button onClick={() => handleMonthClick(m.number)}>{m.name}</button>
          </Nav.Item>
        ))}
      </Nav>
    );
  };

  
  const renderExpenses = () => {
    return (
      <div>
        <h2>Expense Details</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>{expense.description} - ${expense.amount}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h1>Monthly Expenses for {year}</h1>
      {renderMonthTabs()}
      {renderExpenses()}
    </div>
  );
};

export default MonthlyExpenses;
