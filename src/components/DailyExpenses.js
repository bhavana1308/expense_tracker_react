import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';

const DailyExpenses = () => {
  const { year, month } = useParams();
  const [dailyExpenses, setDailyExpenses] = useState({});
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [year, month]);

  const fetchMonthlyExpenses = async () => {
    try {
      const response = await request('GET', `/api/expenses/monthly?userId=${userId}&year=${year}&month=${month}`);
      if (response.status === 200) {
        setDailyExpenses(response.data);
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
      <h1>Daily Expenses for {month}/{year}</h1>
      <ul>
        {Object.entries(dailyExpenses).map(([day, expense]) => (
          <li key={day}>
            Day {day}: {expense}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyExpenses;
