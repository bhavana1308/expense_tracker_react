import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import DatePicker from 'react-datepicker';
import ExpenseList from './ExpenseList'; 

const DailyExpenses = () => {
  const { year, month } = useParams();
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [totalExpense, setTotalExpense] = useState(null); // State to store total expense
  const [expensesForDate, setExpensesForDate] = useState([]); // State to store expenses for selected date
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    if (selectedDate) {
      fetchTotalExpenseForDate(selectedDate);
      fetchExpensesForDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchTotalExpenseForDate = async (date) => {
    try {
      const response = await request('GET', `/api/expenses/daily?userId=${userId}&year=${year}&month=${month}&day=${date}`);
      if (response.status === 200) {
        setTotalExpense(response.data.totalExpense);
      } else {
        console.error(`Failed to fetch total expense for date ${date}`);
        setTotalExpense(null);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setTotalExpense(null);
    }
  };

  const fetchExpensesForDate = async (date) => {
    try {
      // Assuming you have an API endpoint to fetch expenses for a specific date
      const response = await request('GET', `/api/expenses/for-date?userId=${userId}&year=${year}&month=${month}&day=${date}`);
      if (response.status === 200) {
        setExpensesForDate(response.data.expenses);
      } else {
        console.error(`Failed to fetch expenses for date ${date}`);
        setExpensesForDate([]);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setExpensesForDate([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Navbar />
      <h1>Daily Expenses for {month}/{year}</h1>
      {/* DatePicker for selecting date */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select Date"
      />

      {/* Display total expense and list of expenses for selected date */}
      {selectedDate && (
        <>
          <h2>Total Expense for {selectedDate}: {totalExpense !== null ? totalExpense : 'N/A'}</h2>
          <ExpenseList expenses={expensesForDate} />
        </>
      )}
    </div>
  );
};

export default DailyExpenses;
