import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const handleChange = e => {
    setUsername(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username);

    axios.post('http://localhost:5000/users/add', { username }).then(res => console.log(res.data));

    setUsername('');
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            autoComplete="off"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-4">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
