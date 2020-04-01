import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <div>
        <Link to='/'>Go Home</Link>
      </div>
    </>
  );
};

export default NotFound;
