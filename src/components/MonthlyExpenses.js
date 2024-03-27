// MonthlyExpenses.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';

const MonthlyExpenses = () => {
  const { year } = useParams();
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [year]);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await request('GET', `/api/expenses/monthly?userId=${userId}&year=${year}`);
      if (response.status === 200) {
        setMonthlyExpenses(response.data);
      } else {
        console.error('Failed to fetch monthly expenses');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Monthly Expenses for {year}</h1>
      <ul>
        {monthlyExpenses.map((expense, index) => (
          <li key={index}>
            <Link to={`/${year}/${expense.month}`}>{expense.month}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyExpenses;
