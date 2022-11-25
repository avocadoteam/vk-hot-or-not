import React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const Violence = React.memo<Props>(({ className = '' }) => {
  return (
    <>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path
          d="M9.44005 7.26069L6.30871 10.1286C5.90336 10.4999 5.87363 11.1287 6.24215 11.5365L10.3912 16.1281C11.189 16.9227 13.9094 18.0695 16.9258 17.9967C17.5072 17.9827 17.8955 17.4318 17.6945 16.8861C17.3019 15.8202 16.5513 14.3436 15.325 13.1221L9.44005 7.26069Z"
          fill="currentColor"
        />
        <path
          d="M7.79527 5.15903C8.18529 5.54748 8.18802 6.1781 7.80139 6.56993L6.59062 7.79695C6.20143 8.19137 5.56572 8.19412 5.17313 7.80309L1.29159 3.93708C1.14967 3.79573 0.957531 3.71636 0.757227 3.71636C0.339022 3.71636 0 3.37734 0 2.95914V2.5948C0 2.29308 0.136229 2.00749 0.370721 1.81762L1.91721 0.565435C2.31437 0.243853 2.8901 0.273463 3.25218 0.634093L3.79353 1.17329L7.79527 5.15903Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
});
