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
      const day = selectedDate.getDate();
      const response = await request('GET', `/api/expenses/daily?userId=${userId}&year=${year}&month=${month}&day=${day}`);
      if (response.status === 200) {
        // Extract the total expense value from the response object
        const totalExpense = response.data.totalExpense;
        setTotalExpense(totalExpense);
        // Fetch all expenses for the selected date
        fetchExpensesForDate(date);
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
      const day = selectedDate.getDate();
      const response = await request('GET', `/api/expenses/for-date?userId=${userId}&year=${year}&month=${month}&day=${day}`);
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
    <div style={{ textAlign: "center" }}>

      <Navbar />

      <h1>Daily Expenses for {month}/{year}</h1>

      {/* DatePicker for selecting date */}
      <div style={{ display: "inline-block" }}>
        <DatePicker 
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select Date"
        />
      </div>
    

      {/* Display total expense */}
      {totalExpense !== null && (
        <h2>Total Expense for {selectedDate.toLocaleDateString()}: {JSON.stringify(totalExpense)}</h2>
      )}

      {/* View details button */}
      {totalExpense !== null && (
        <button className='btn' onClick={() => fetchExpensesForDate(selectedDate)}>
          View Details
        </button>
      )}

      {/* Display list of expenses for the selected date */}
       
      {/* {expensesForDate && (
       
      <ExpenseList expenses={expensesForDate}  /> */}
{/* )} */}
    </div>
  );
};

export default DailyExpenses;
