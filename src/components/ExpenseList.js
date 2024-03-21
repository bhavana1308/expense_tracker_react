import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../../axios_helper';
import { Card, Button } from 'react-bootstrap';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const id = getUserIdFromAuthToken(getAuthToken());
        const response = await request('GET', `/api/expenses/list?id=${id}`);
        if (response.status === 200) {
          setExpenses(response.data);
        } else {
          console.error('Failed to fetch expenses');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchExpenses();
  }, [userId]);

  

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Expense List</h1>
        <div className="row">
          {expenses.map(expense => (
            <div key={expense.id} className="col-md-4 mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{expense.description}</Card.Title>
                  <Card.Text>
                    <strong>Amount:</strong> {expense.amount}<br />
                    <strong>Category:</strong> {expense.category}
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleDelete(expense.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
