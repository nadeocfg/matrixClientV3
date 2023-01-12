import React from 'react';
import { ViewProps } from 'react-native';
import { Path, G, Svg, Defs, ClipPath, Rect, Circle } from 'react-native-svg';

interface IconProps extends ViewProps {
  color?: string;
  secondColor?: string;
}

export const CloseEyeIcon = ({ color }: IconProps) => {
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

export const EyeIcon = ({ color }: IconProps) => {
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

export const ArrowLeftIcon = ({ color = '#3C3C43' }: IconProps) => {
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

export const ArrowRightIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="8" height="13" viewBox="0 0 8 13" fill="none">
      <Path
        d="M7.17676 6.41699C7.17676 6.15674 7.08154 5.94092 6.87842 5.73779L1.99072 0.958008C1.82568 0.792969 1.62891 0.716797 1.39404 0.716797C0.917969 0.716797 0.530762 1.09131 0.530762 1.56738C0.530762 1.80225 0.632324 2.01807 0.803711 2.18945L5.14551 6.41064L0.803711 10.6445C0.632324 10.8159 0.530762 11.0254 0.530762 11.2666C0.530762 11.7427 0.917969 12.1235 1.39404 12.1235C1.62891 12.1235 1.82568 12.041 1.99072 11.876L6.87842 7.09619C7.08789 6.89307 7.17676 6.67725 7.17676 6.41699Z"
        fill={color}
      />
    </Svg>
  );
};

export const MicIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="13" height="20" viewBox="0 0 13 20" fill="none">
      <Path
        d="M6.50454 12.6548C8.31237 12.6548 9.5297 11.3012 9.5297 9.36618V3.28861C9.5297 1.34451 8.31237 0 6.50454 0C4.68763 0 3.4703 1.34451 3.4703 3.28861V9.36618C3.4703 11.3012 4.68763 12.6548 6.50454 12.6548ZM0 9.51153C0 13.0727 2.3529 15.5709 5.81412 15.8616V17.9783H2.44375C2.06219 17.9783 1.75332 18.2872 1.75332 18.6688C1.75332 19.0503 2.06219 19.3501 2.44375 19.3501H10.5563C10.9378 19.3501 11.2467 19.0503 11.2467 18.6688C11.2467 18.2872 10.9378 17.9783 10.5563 17.9783H7.18588V15.8616C10.6562 15.5709 13 13.0727 13 9.51153V7.66737C13 7.28581 12.7002 6.98602 12.3187 6.98602C11.9371 6.98602 11.6282 7.28581 11.6282 7.66737V9.45702C11.6282 12.5549 9.61146 14.608 6.50454 14.608C3.38854 14.608 1.37177 12.5549 1.37177 9.45702V7.66737C1.37177 7.28581 1.07198 6.98602 0.681342 6.98602C0.29979 6.98602 0 7.28581 0 7.66737V9.51153Z"
        fill={color}
      />
    </Svg>
  );
};

export const ArrowUpIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M15.9998 31C24.2841 31 30.9998 24.2843 30.9998 16C30.9998 7.71573 24.2841 1 15.9998 1C7.71555 1 0.999817 7.71573 0.999817 16C0.999817 24.2843 7.71555 31 15.9998 31Z"
        fill={color}
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.9998 16L15.9998 10L9.99982 16"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16 22V10"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const DotsIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2" fill={color} />
      <Circle cx="12" cy="19" r="2" fill={color} />
    </Svg>
  );
};

export const MagnifierIcon = ({ color = '#3C3C43', ...props }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props} fill="none">
      <Path
        d="M10.3833 16.7666C11.7695 16.7666 13.0479 16.3184 14.0938 15.5713L18.0283 19.5059C18.2109 19.6885 18.4517 19.7798 18.709 19.7798C19.2485 19.7798 19.6304 19.3647 19.6304 18.8335C19.6304 18.5845 19.5474 18.3438 19.3647 18.1694L15.4551 14.2515C16.2769 13.1724 16.7666 11.8359 16.7666 10.3833C16.7666 6.87207 13.8945 4 10.3833 4C6.88037 4 4 6.86377 4 10.3833C4 13.8945 6.87207 16.7666 10.3833 16.7666ZM10.3833 15.3887C7.64404 15.3887 5.37793 13.1226 5.37793 10.3833C5.37793 7.64404 7.64404 5.37793 10.3833 5.37793C13.1226 5.37793 15.3887 7.64404 15.3887 10.3833C15.3887 13.1226 13.1226 15.3887 10.3833 15.3887Z"
        fill={color}
        fill-opacity="0.6"
      />
    </Svg>
  );
};

export const CloseIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="11" height="12" viewBox="0 0 11 12" fill="none">
      <Rect
        y="2.06079"
        width="2"
        height="13"
        rx="1"
        transform="rotate(-45 0 2.06079)"
        fill={color}
      />
      <Rect
        width="2"
        height="13"
        rx="1"
        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 10.6294 2.12134)"
        fill={color}
      />
    </Svg>
  );
};

export const QuestionMarkRounded = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.08997 8.99999C9.32507 8.33166 9.78912 7.7681 10.3999 7.40912C11.0107 7.05015 11.7289 6.91893 12.4271 7.0387C13.1254 7.15848 13.7588 7.52151 14.215 8.06352C14.6713 8.60552 14.921 9.29151 14.92 9.99999C14.92 12 11.92 13 11.92 13"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 17H12.01"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const PlusRoundedIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <G clip-path="url(#clip0_543_2682)">
        <Path
          d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
          fill="#EBEBF5"
          fill-opacity="0.6"
        />
        <Path
          d="M15 8V22"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8 15H22"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_543_2682">
          <Rect width="30" height="30" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const LinkIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14 11.0002C13.5705 10.4261 13.0226 9.95104 12.3934 9.60729C11.7642 9.26353 11.0684 9.05911 10.3533 9.00789C9.63816 8.95667 8.92037 9.05986 8.24861 9.31044C7.57685 9.56103 6.96684 9.95316 6.45996 10.4602L3.45996 13.4602C2.54917 14.4032 2.04519 15.6662 2.05659 16.9772C2.06798 18.2882 2.59382 19.5423 3.52086 20.4693C4.4479 21.3964 5.70197 21.9222 7.01295 21.9336C8.32393 21.945 9.58694 21.441 10.53 20.5302L12.24 18.8202"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const LockIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const CheckIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const PlusIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4V20"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4 12H20"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const CloseSquareIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Rect width="24" height="24" rx="5" fill={color} />
      <Path
        d="M6.34314 6.34326L17.6568 17.657"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.34314 17.6567L17.6568 6.34303"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const CameraIcon = ({
  color = '#38383A',
  secondColor = '#fff',
}: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
        fill={color}
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
        stroke={secondColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const GalleryIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_649_2336)">
        <G clip-path="url(#clip1_649_2336)">
          <G clip-path="url(#clip2_649_2336)">
            <Path
              d="M5 11.1L7 9.1L12.5 14.6L16 11.1L19 14.1V5H5V11.1ZM4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM15.5 10C15.1022 10 14.7206 9.84196 14.4393 9.56066C14.158 9.27936 14 8.89782 14 8.5C14 8.10218 14.158 7.72064 14.4393 7.43934C14.7206 7.15804 15.1022 7 15.5 7C15.8978 7 16.2794 7.15804 16.5607 7.43934C16.842 7.72064 17 8.10218 17 8.5C17 8.89782 16.842 9.27936 16.5607 9.56066C16.2794 9.84196 15.8978 10 15.5 10Z"
              fill={color}
            />
          </G>
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_649_2336">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
        <ClipPath id="clip1_649_2336">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
        <ClipPath id="clip2_649_2336">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const FileIcon = ({
  color = '#38383A',
  secondColor = '#fff',
}: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
        fill={color}
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13 2V9H20"
        stroke={secondColor}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const LocationIcon = ({ color = '#38383A' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 11L22 2L13 21L11 13L3 11Z"
        fill={color}
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export const LeaveIcon = ({ color = '#EBEBF5' }: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.72034 9.70887C7.11184 9.31932 7.11342 8.68616 6.72387 8.29466C6.33432 7.90316 5.70116 7.90158 5.30966 8.29113L6.72034 9.70887ZM2.29466 11.2911C1.90316 11.6807 1.90158 12.3138 2.29113 12.7053C2.68068 13.0968 3.31384 13.0984 3.70534 12.7089L2.29466 11.2911ZM3.70534 11.2911C3.31384 10.9016 2.68068 10.9032 2.29113 11.2947C1.90158 11.6862 1.90316 12.3193 2.29466 12.7089L3.70534 11.2911ZM5.30966 15.7089C5.70116 16.0984 6.33432 16.0968 6.72387 15.7053C7.11342 15.3138 7.11184 14.6807 6.72034 14.2911L5.30966 15.7089ZM3 11C2.44771 11 2 11.4477 2 12C2 12.5523 2.44771 13 3 13V11ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM5.30966 8.29113L2.29466 11.2911L3.70534 12.7089L6.72034 9.70887L5.30966 8.29113ZM2.29466 12.7089L5.30966 15.7089L6.72034 14.2911L3.70534 11.2911L2.29466 12.7089ZM3 13L17 13V11L3 11V13Z"
        fill={color}
        fill-opacity="0.6"
      />
      <Path
        d="M9 15C9 17.2091 10.7909 19 13 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5H13C10.7909 5 9 6.79086 9 9"
        stroke={color}
        stroke-opacity="0.6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
