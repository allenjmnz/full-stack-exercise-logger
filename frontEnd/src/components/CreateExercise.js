import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  username: '',
  description: '',
  duration: 0,
  date: new Date()
};

const CreateExercise = props => {
  const [exercise, setExercise] = useState(initialState);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/').then(res => {
      if (res.data.length > 0) {
        setUsers(res.data.map(user => user.username));
        setExercise(prev => ({
          ...prev,
          username: res.data[0].username
        }));
      }
    });
  }, []);

  const handleChangeEvent = e => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeDate = date => {
    setExercise({
      ...exercise,
      date
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(exercise);
    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => {
        props.history.push('/');
        console.log(res.data);
      })
      .catch(err => console.log('Error: ' + err));
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <select
            className="form-control"
            name="username"
            id="username"
            value={exercise.username}
            onChange={handleChangeEvent}
            required
          >
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            value={exercise.description}
            onChange={handleChangeEvent}
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration: </label>
          <input
            type="text"
            className="form-control"
            name="duration"
            id="duration"
            value={exercise.duration}
            onChange={handleChangeEvent}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <br />
          <DatePicker className="form-control" selected={exercise.date} onChange={handleChangeDate} />
        </div>
        <div className="form-group mt-4">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
