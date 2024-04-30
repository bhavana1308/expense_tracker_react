import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import DatePicker from 'react-datepicker';
import ExpenseList from './ExpenseList'; 
import '../styles/DailyExpenses.css';

const DailyExpenses = () => {
  const { year, month } = useParams();
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [totalExpense, setTotalExpense] = useState(null); // State to store total expense
  const [expensesForDate, setExpensesForDate] = useState([]); // State to store expenses for selected date
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    if (selectedDate) {
      fetchTotalExpenseForDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchTotalExpenseForDate = async (date) => {
    try {
      const day = date.getDate();
      const response = await request('GET', `/api/expenses/daily?userId=${userId}&year=${year}&month=${month}&day=${day}`);
      if (response.status === 200) {
        const totalExpense = response.data.totalExpense;
        setTotalExpense(totalExpense);
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
      const day = date.getDate();
      const response = await request('GET', `/api/expenses/for-date?userId=${userId}&year=${year}&month=${month}&day=${day}`);
      if (response.status === 200) {
        setExpensesForDate(response.data);
      } else {
        console.error(`Failed to fetch expenses for date ${date}`);
        setExpensesForDate([]);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setExpensesForDate([]);
    }
  };
  
  const handleFilterExpenses = (filteredExpenses) => {
    setExpensesForDate(filteredExpenses);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleViewDetails = () => {
    if (selectedDate) {
      fetchExpensesForDate(selectedDate);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>

      <Navbar />

      <h1>Daily Expenses for {month}/{year}</h1>

      <div style={{ display: "inline-block" }}>
        <DatePicker 
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select Date"
        />
      </div>

      {totalExpense !== null && (
        <h2>Total Expense for {selectedDate.toLocaleDateString()}: {JSON.stringify(totalExpense)}</h2>
      )}

      {totalExpense !== null && (
        <button className='btn' onClick={handleViewDetails}>
          View Details
        </button>
      )}

      {expensesForDate.length > 0 && <ExpenseList expenses={expensesForDate} onFilter={handleFilterExpenses} />}
    </div>
  );
};

export default DailyExpenses;
