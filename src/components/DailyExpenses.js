import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import DatePicker from 'react-datepicker';
import ExpenseList from './ExpenseList'; 
import '../styles/DailyExpenses.css';
import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

const DailyExpenses = () => {
  const { year, month } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);
  const [expensesForDate, setExpensesForDate] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to control details view
  const userId = getUserIdFromAuthToken(getAuthToken());

  useEffect(() => {
    if (selectedDate) {
      fetchTotalExpenseForDate(selectedDate);
      setShowDetails(false); // Reset details view on date change
    }
  }, [selectedDate]);

  const fetchTotalExpenseForDate = async (date) => {
    try {
      const day = date.getDate();
      const response = await request('GET', `/api/expenses/daily?userId=${userId}&year=${year}&month=${month}&day=${day}`);
      if (response.status === 200) {
        setTotalExpense(response.data.totalExpense);
      } else {
        setError(`Failed to fetch total expense for date ${date.toLocaleDateString()}`);
        setTotalExpense(null);
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
      setTotalExpense(null);
    }
  };

  const fetchExpensesForDate = async (date) => {
    try {
      const day = date.getDate();
      const response = await request('GET', `/api/expenses/for-date?userId=${userId}&year=${year}&month=${month}&day=${day}`);
      if (response.status === 200) {
        setExpensesForDate(response.data);
        setShowDetails(true); // Show details view after fetching expenses
      } else {
        setError(`Failed to fetch expenses for date ${date.toLocaleDateString()}`);
        setExpensesForDate([]);
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
      setExpensesForDate([]);
    }
  };

  const handleFilterExpenses = (filteredExpenses) => {
    setExpensesForDate(filteredExpenses);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError(null);
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
        <h2>Total Expense for {selectedDate.toLocaleDateString()}: ${totalExpense}</h2>
      )}

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}

      {totalExpense !== null && (
        <button className='btn' onClick={() => fetchExpensesForDate(selectedDate)}>
          View Details
        </button>
      )}

      {showDetails && expensesForDate.length > 0 && (
        <ExpenseList expenses={expensesForDate} onFilter={handleFilterExpenses} showDetails={showDetails} />
      )}
    </div>
  );
};

export default DailyExpenses;
