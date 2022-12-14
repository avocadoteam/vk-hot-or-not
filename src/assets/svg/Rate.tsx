import React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const Rate = React.memo<Props>(({ className = '' }) => {
  return (
    <>
      <svg width="28" height="20" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M20.8333 7.5C20.8333 11.366 17.6993 14.5 13.8333 14.5C9.96734 14.5 6.83333 11.366 6.83333 7.5C6.83333 3.63401 9.96734 0.5 13.8333 0.5C17.6993 0.5 20.8333 3.63401 20.8333 7.5Z"
          fill="#818C99"
        />
        <path
          d="M28 7.5C28 9.15685 26.6569 10.5 25 10.5H22.3212C22.6528 9.56166 22.8333 8.55191 22.8333 7.5C22.8333 6.44809 22.6528 5.43834 22.3212 4.5H25C26.6569 4.5 28 5.84315 28 7.5Z"
          fill="#818C99"
        />
        <path
          d="M3 10.5C1.34315 10.5 0 9.15685 0 7.5C0 5.84315 1.34315 4.5 3 4.5H5.34543C5.01378 5.43834 4.83331 6.44809 4.83331 7.5C4.83331 8.55191 5.01378 9.56166 5.34543 10.5H3Z"
          fill="#818C99"
        />
      </svg>
    </>
  );
});
