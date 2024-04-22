import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';

const DailyExpenses = () => {
  const { year, month } = useParams();
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    fetchMonthlyExpenses();
  }, [year, month]);

  const fetchMonthlyExpenses = async () => {
    try {
      const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
      const expensesByDay = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const response = await request('GET', `/api/expenses/daily?userId=${userId}&year=${year}&month=${month}&day=${day}`);
        
        if (response.status === 200) {
          expensesByDay.push({ day, expense: response.data.totalExpense });
        } else {
          console.error(`Failed to fetch daily expenses for day ${day}`);
          expensesByDay.push({ day, expense: 0 });
        }
      }

      setDailyExpenses(expensesByDay);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Daily Expenses for {month}/{year}</h1>
      <ul>
        {dailyExpenses.map(({ day, expense }) => (
          <li key={day}>
            Day {day}: {expense}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyExpenses;
