import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { request, getAuthToken, getUserIdFromAuthToken } from '../axios_helper';
import { Card, Button, Dropdown } from 'react-bootstrap';
import '../styles/ExpenseList.css'

const ExpenseList = ({ onFilter }) => {
  const [expenses, setExpenses] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [sortBy]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const id = getUserIdFromAuthToken(getAuthToken());
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      
      let response;
      if (sortBy === 'date') {
        response = await request('GET', `/api/sort/by-date?month=${month}&year=${year}`);
      } else {
        response = await request('GET', `/api/sort/by-amount?month=${month}&year=${year}&sortOrder=desc`);
      }
      
      if (response.status === 200) {
        setExpenses(response.data);
        // Pass filtered expenses to parent component
        onFilter(response.data);
      } else {
        console.error('Failed to fetch expenses');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('DELETE', `/api/expenses/delete/${expenseId}?id=${id}`);
      if (response.status === 200) {
        console.log('Expense deleted successfully');
        fetchExpenses();
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  return (
    <div>
      <Navbar />
      
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
