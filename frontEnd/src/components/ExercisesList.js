import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    console.log('Montado');
    axios
      .get('http://localhost:5000/exercises/')
      .then(({ data }) => {
        setExercises([...data]);
      })
      .catch(err => console.log('Error: ' + err));

    return () => console.log('Desmontado');
  }, []);

  const deleteExercise = id => {
    axios
      .delete('http://localhost:5000/exercises/' + id)
      .then(() => {
        setExercises(prev => prev.filter(el => el._id !== id));
      })
      .catch(err => console.log('Error: ' + err));
  };

  const exerciseList = () =>
    exercises.map(curExercise => <Exercise {...curExercise} deleteExercise={deleteExercise} key={curExercise._id} />);

  return (
    <div>
      <h3>Logged Exercises</h3>
      <br />
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username </th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {exercises.length > 0 ? (
          <tbody>{exerciseList()}</tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="6" className="text-center" style={{ color: 'lightgray' }}>
                No exercises to display.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default ExercisesList;
