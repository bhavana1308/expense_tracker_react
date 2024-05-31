import React, { useState } from 'react';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Card, Button, Dropdown } from 'react-bootstrap';
import '../styles/ExpenseList.css';
import Navbar from './Navbar';

const ExpenseList = ({ expenses, onFilter, showDetails }) => {
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(false);

  const handleDelete = async (expenseId) => {
    try {
      const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('DELETE', `/api/expenses/delete/${expenseId}?id=${id}`);
      if (response.status === 200) {
        console.log('Expense deleted successfully');
        onFilter(expenses.filter(expense => expense.id !== expenseId)); // Update the list after deletion
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSortChange = async (value) => {
    setSortBy(value);
    setLoading(true);
    try {
      const sortedExpenses = [...expenses].sort((a, b) => {
        if (value === 'date') {
          return new Date(b.date) - new Date(a.date);
        } else {
          return b.amount - a.amount;
        }
      });
      onFilter(sortedExpenses);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!showDetails && <Navbar />}
      <h1>Expense List</h1>
      <div className="d-flex justify-content-center mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Sort By: {sortBy === 'date' ? 'Date' : 'Amount'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortChange('date')}>Date</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange('amount')}>Amount</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="card-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          expenses.map(expense => (
            <div key={expense.id} className="col-md-4 mb-4">
              <Card className='card-item'>
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
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
