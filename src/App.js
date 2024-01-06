import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [success, setSuccess] = useState(false)

  const handleFormSubmit = async (e) => {
    console.log("e", e)
    e.preventDefault();

    // Replace with your Trello API key and token
    const apiKey = '9e7fa27f9843be645eb70615f2fc3ad0';
    const token = 'ATTAc2dee22a216f7ed7b77e58f47a5e0d42b96cc7abc796eecc35830fe8c8185bfb897D9166';

    const data = {
      name,
      desc: description,
      start: startDate,
      due: dueDate,
      idList: '65990a044ace7f7d3bb236eb', // Replace with the Trello list ID where you want to create the card
      idMembers: '', // Replace with member ID if you want to assign a member
      idLabels: '', // Replace with label ID if you want to assign a label
      pos: 65536, // Position of the card in the list
    };
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${apiKey}&token=${token}`,
        data
      );

      console.log('Card created:', response.data);
      if (response.data) {
        setSuccess(true)
      }
      // Reset form fields
      setName('');
      setDescription('');
      setDueDate('');
      setStartDate('');
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create Trello Card</h1>
      <form id="trello-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="start-date">Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="due-date">Due Date:</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        {success && <p>success</p>}
        <button type="submit">Create Card</button>

      </form>
    </div>
  );
};

export default App;
