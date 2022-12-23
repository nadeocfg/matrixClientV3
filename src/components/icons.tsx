import React from 'react';
import { Path, G, Svg, Defs, ClipPath, Rect, Circle } from 'react-native-svg';

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

export const MockedLogo = () => {
  return (
    <Svg width="121" height="120" viewBox="0 0 121 120" fill="none">
      <Circle
        opacity="0.5"
        cx="60.5"
        cy="60"
        r="60"
        fill="#787880"
        fillOpacity="0.36"
      />
    </Svg>
  );
};

export const ArrowLeftIcon = ({ color = '#3C3C43' } = {}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.82324 11.583C7.82324 11.8433 7.91846 12.0591 8.12158 12.2622L13.0093 17.042C13.1743 17.207 13.3711 17.2832 13.606 17.2832C14.082 17.2832 14.4692 16.9087 14.4692 16.4326C14.4692 16.1978 14.3677 15.9819 14.1963 15.8105L9.85449 11.5894L14.1963 7.35547C14.3677 7.18408 14.4692 6.97461 14.4692 6.7334C14.4692 6.25732 14.082 5.87646 13.606 5.87646C13.3711 5.87646 13.1743 5.95898 13.0093 6.12402L8.12158 10.9038C7.91211 11.1069 7.82324 11.3228 7.82324 11.583Z"
        fill={color}
        fill-opacity="0.6"
      />
    </Svg>
  );
};

export const DotsIcon = ({ color = '#38383A' }: { color?: string }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2" fill={color} />
      <Circle cx="12" cy="19" r="2" fill={color} />
    </Svg>
  );
};

export const MagnifierIcon = ({ color = '#3C3C43', ...rest }: any) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...rest}>
      <Path
        d="M10.3833 16.7666C11.7695 16.7666 13.0479 16.3184 14.0938 15.5713L18.0283 19.5059C18.2109 19.6885 18.4517 19.7798 18.709 19.7798C19.2485 19.7798 19.6304 19.3647 19.6304 18.8335C19.6304 18.5845 19.5474 18.3438 19.3647 18.1694L15.4551 14.2515C16.2769 13.1724 16.7666 11.8359 16.7666 10.3833C16.7666 6.87207 13.8945 4 10.3833 4C6.88037 4 4 6.86377 4 10.3833C4 13.8945 6.87207 16.7666 10.3833 16.7666ZM10.3833 15.3887C7.64404 15.3887 5.37793 13.1226 5.37793 10.3833C5.37793 7.64404 7.64404 5.37793 10.3833 5.37793C13.1226 5.37793 15.3887 7.64404 15.3887 10.3833C15.3887 13.1226 13.1226 15.3887 10.3833 15.3887Z"
        fill={color}
        fill-opacity="0.6"
      />
    </Svg>
  );
};
