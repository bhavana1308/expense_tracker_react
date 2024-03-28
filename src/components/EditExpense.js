import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Form, Button } from 'react-bootstrap';

const EditExpense = () => {
  const { expenseId } = useParams();
  const navigate = useNavigate();
  
  const [expense, setExpense] = useState({
    description: '',
    amount: 0,
    category: '',
  });

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        const id = getUserIdFromAuthToken(getAuthToken());
        const response = await request('GET', `/api/expenses/edit/${expenseId}?id=${id}`);
        if (response.status === 200) {
          setExpense(response.data);
        } else {
          console.error('Failed to fetch expense details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchExpenseDetails();
  }, [expenseId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('PUT', `/api/expenses/edit/${expenseId}?id=${id}`, expense);
      if (response.status === 200) {
        console.log('Expense updated successfully');
        navigate('/api/expenses/list'); // Redirect to expense list after successful update
      } else {
        console.error('Failed to update expense');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Edit Expense</h1>
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
          <Button variant="primary" type="submit">
            Update Expense
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditExpense;
