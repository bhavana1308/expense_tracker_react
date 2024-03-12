import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../../axios_helper';

const AddExpense = () => {
  const navigate = useNavigate();
  const userId = getUserIdFromAuthToken(getAuthToken());

  const [expense, setExpense] = useState({
    description: '',
    amount: 0,
    category: '',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expense.description || expense.amount <= 0 || !expense.category) {
      alert('Please enter valid expense details.');
      return;
    }

    try {
      const response = await request('POST', `api/expenses/add?id=${userId}`, expense);

      if (response.status === 201) {
        console.log('Expense added successfully');
        setExpense({
          description: '',
          amount: 0,
          category: '',
        });
        navigate('/api/expenses/list'); 
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  return (
    <div>
      <Navbar />
      <h1>Create a new Expense</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            value={expense.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            type="text"
            value={expense.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Create Expense</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
