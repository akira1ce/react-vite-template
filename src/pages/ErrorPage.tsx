import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center text-xl">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Sorry, an unexpected error has occurred.</div>
        <Link to={'/'}>Back home.</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
