import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddExpense = () => {
  const navigate = useNavigate();
  const userId = getUserIdFromAuthToken(getAuthToken());

  const [expense, setExpense] = useState({
    description: '',
    amount: 0,
    category: '',
    date: new Date() // Default to current date
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expense.description || expense.amount <= 0 || !expense.category) {
      alert('Please enter valid expense details.');
      return;
    }

    try {
      const response = await request('POST', `api/expense/add?id=${userId}`, expense);

      if (response.status === 201) {
        console.log('Expense added successfully');
        setExpense({
          description: '',
          amount: 0,
          category: '',
          date: new Date() // Reset date to current date
        });
        navigate('/api/expense/list'); 
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

  const handleDateChange = (date) => {
    setExpense({ ...expense, date });
  };

  return (
    <div>
      <Navbar />
      <h1>Create a new Expense</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            name="description"
            type="text"
            value={expense.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            value={expense.amount}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            name="category"
            type="text"
            value={expense.category}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Date:</Form.Label>
          <br />
          <DatePicker selected={expense.date} onChange={handleDateChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Expense
        </Button>
      </Form>
    </div>
  );
};

export default AddExpense;
