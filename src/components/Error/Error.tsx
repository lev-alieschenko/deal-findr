import React from 'react';

interface ErrorDisplayProps {
  error: Error;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className='p-4 bg-red-50 border border-red-200 rounded-md'>
      <h2 className='text-lg font-semibold text-red-700'>
        Error Loading Search Results
      </h2>
      <p className='text-red-600 mt-2'>{error.message}</p>
      <details className='mt-4'>
        <summary className='cursor-pointer text-red-600'>
          View Error Details
        </summary>
        <pre className='mt-2 p-2 bg-red-100 rounded text-sm overflow-auto'>
          {error.stack || JSON.stringify(error, null, 2)}
        </pre>
      </details>
    </div>
  );
};
