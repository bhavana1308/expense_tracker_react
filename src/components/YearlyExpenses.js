import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Form, Card } from 'react-bootstrap';

const YearlyExpenses = () => {
  const [yearlyExpenses, setYearlyExpenses] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchYearlyExpenses();
  }, []);

  const fetchYearlyExpenses = async () => {
    try {
      const response = await request('GET', `/api/expenses/yearly?userId=${userId}`);
      if (response.status === 200) {
        setYearlyExpenses(response.data);
      } else {
        console.error('Failed to fetch yearly expenses');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <h1>Yearly Expenses</h1>
      <Form.Group>
        <Form.Label>Select Year:</Form.Label>
        <div>
          <Form.Check
            inline
            label="2022"
            type="radio"
            id="year-2022"
            value="2022"
            checked={selectedYear === '2022'}
            onChange={handleYearChange}
          />
          <Form.Check
            inline
            label="2023"
            type="radio"
            id="year-2023"
            value="2023"
            checked={selectedYear === '2023'}
            onChange={handleYearChange}
          />
          <Form.Check
            inline
            label="2024"
            type="radio"
            id="year-2024"
            value="2024"
            checked={selectedYear === '2024'}
            onChange={handleYearChange}
          />
        </div>
      </Form.Group>
      {selectedYear && (
        <div className="card-container">
          {yearlyExpenses
            .filter(expense => expense.year === selectedYear)
            .map((expense, index) => (
              <Card key={index}>
                <Card.Body>
                  <Card.Title>{expense.year}</Card.Title>
                  <Card.Text>Total Expenses: {expense.totalExpense}</Card.Text>
                  <Link to={`/${expense.year}`}>View Monthly Expenses</Link>
                </Card.Body>
              </Card>
             
            ))}
        </div>
      )}
    </div>
  );
};

export default YearlyExpenses;
