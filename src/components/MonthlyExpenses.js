import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Nav, Card } from 'react-bootstrap';

const MonthlyExpenses = () => {
  const { year } = useParams();
  const [expenses, setExpenses] = useState(null); // Initialize expenses as null
  const [activeMonth, setActiveMonth] = useState(1);
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchMonthlyExpenses(year, activeMonth);
  }, [year, activeMonth]);

  const fetchMonthlyExpenses = async (selectedYear, selectedMonth) => {
    try {
      const response = await request('GET', `/api/expenses/monthly?userId=${userId}&year=${selectedYear}&month=${selectedMonth}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('An error occurred:', error);
      setExpenses([]); // Set expenses to an empty array or another appropriate value on error
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

  // Ensure expenses is not null before attempting to filter
  const filteredExpenses = expenses && Array.isArray(expenses) ? expenses.filter(expense => {
    const expenseMonth = parseInt(expense.month.split('-')[1]); 
    return expenseMonth === activeMonth;
  }) : [];

  return (
    <div>
      <Navbar />
      <h1>Monthly Expenses for {year}</h1>
      <Nav variant="tabs">
        {months.map((month) => (
          <Nav.Item key={month.number}>
            <Nav.Link onClick={() => handleMonthClick(month.number)} active={activeMonth === month.number}>
              {month.name}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className="card-container">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map((expense, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{expense.month}</Card.Title>
                <Card.Text>Total Expenses: {expense.totalExpense}</Card.Text>
                </Card.Body>
            </Card>
          ))
        ) : (
          <p>No expenses available for this month</p>
        )}
      </div>
    </div>
  );
};

export default MonthlyExpenses;
