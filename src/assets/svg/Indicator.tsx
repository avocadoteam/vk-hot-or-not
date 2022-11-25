import React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const Indicator = React.memo<Props>(({ className = '' }) => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g filter="url(#filter0_d_194_2886)">
        <path
          d="M20.7639 19H13.2361C11.7493 19 10.7823 17.4354 11.4472 16.1056L15.2111 8.57771C15.9482 7.10361 18.0518 7.10361 18.7889 8.57771L22.5528 16.1056C23.2177 17.4354 22.2507 19 20.7639 19Z"
          fill="white"
        />
        <path
          d="M13.2361 20H20.7639C22.9941 20 24.4446 17.6531 23.4472 15.6584L19.6833 8.1305C18.5777 5.91935 15.4223 5.91935 14.3167 8.1305L10.5528 15.6584C9.55544 17.6531 11.0059 20 13.2361 20Z"
          stroke="#FF2E00"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_194_2886"
          x="0.230896"
          y="0.472137"
          width="33.5382"
          height="33.5279"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_194_2886" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_194_2886" result="shape" />
        </filter>
      </defs>
    </svg>
  );
});
