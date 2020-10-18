import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Exercise = ({ username, description, duration, date, _id, deleteExercise }) => {
  const newDate = useRef();
  newDate.current = new Date(date);

  return (
    <tr>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{newDate.current.toString().substring(4, 10) + ',' + newDate.current.toString().substring(10, 15)}</td>
      <td>
        <Link className="btn btn-primary" to={'/edit/' + _id}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <button className="btn btn-danger" onClick={() => deleteExercise(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Exercise;
