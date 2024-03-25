import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [yearlyExpense, setYearlyExpense] = useState(0);
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchYearlyExpense();
  }, []);

  const fetchYearlyExpense = async () => {
    try {
      const response = await request('GET', `/api/expenses/yearly?id=${userId}&year=${selectedYear}`);
      if (response.status === 200) {
        setYearlyExpense(response.data.totalExpense);
      } else {
        console.error('Failed to fetch yearly expense');
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
      <h1>Expense Dashboard</h1>
      <div>
        <label>Select Year:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          {/* Add more years as needed */}
        </select>
      </div>
      {selectedYear && (
        <div>
          <h2>Total Expenses for {selectedYear}</h2>
          <Card>
            <Card.Body>
              <Card.Title>Total Expenses: {yearlyExpense}</Card.Title>
            </Card.Body>
          </Card>
          <Link to={`/expenses/monthly/${selectedYear}`}>View Monthly Expenses</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
