import React from 'react';
import { Path, G, Svg, Defs, ClipPath, Rect } from 'react-native-svg';

export const CloseEyeIcon = ({ color }: any) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_74_2822)">
        <Path
          d="M16.455 16.455C15.1729 17.4323 13.6118 17.9737 12 18C6.75 18 3.75 12 3.75 12C4.68292 10.2614 5.97685 8.74247 7.545 7.54502M10.425 6.18002C10.9412 6.05918 11.4698 5.99877 12 6.00002C17.25 6.00002 20.25 12 20.25 12C19.7947 12.8517 19.2518 13.6536 18.63 14.3925M13.59 13.59C13.384 13.8111 13.1356 13.9884 12.8596 14.1114C12.5836 14.2343 12.2857 14.3005 11.9836 14.3058C11.6815 14.3111 11.3814 14.2555 11.1012 14.1424C10.821 14.0292 10.5665 13.8608 10.3529 13.6471C10.1392 13.4335 9.97079 13.179 9.85763 12.8988C9.74447 12.6186 9.68889 12.3186 9.69423 12.0165C9.69956 11.7143 9.76568 11.4164 9.88866 11.1404C10.0116 10.8644 10.1889 10.616 10.41 10.41"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.75 3.75L20.25 20.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_74_2822">
          <Rect
            width="18"
            height="18"
            fill="white"
            transform="translate(3 3)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const EyeIcon = ({ color }: any) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clipPath="url(#clip0_74_2819)">
        <Path
          d="M3.75 12C3.75 12 6.75 6 12 6C17.25 6 20.25 12 20.25 12C20.25 12 17.25 18 12 18C6.75 18 3.75 12 3.75 12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_74_2819">
          <Rect
            width="18"
            height="18"
            fill="white"
            transform="translate(3 3)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
