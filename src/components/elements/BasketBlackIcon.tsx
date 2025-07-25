// components/icons/CustomIcon.tsx
import * as React from "react";

// interface BasketIconProps extends React.SVGProps<SVGSVGElement> {
//   className?: string;
// }

// const CustomIcon: React.FC<SvgIconProps> = ({ className, ...props }) => (
export default function BasketBlackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <g clipPath="url(#clip0_2694_11214)">
        <path
          fill="#2D2D2D"
          stroke="#000"
          strokeWidth="0.4"
          d="m24.966 10.77.057.097H30.5a1.3 1.3 0 0 1 1.3 1.3v.937a40.25 40.25 0 0 1-3.991 17.475l-.26.526a1.25 1.25 0 0 1-1.125.695H5.578a1.27 1.27 0 0 1-1.128-.698A40.25 40.25 0 0 1 .2 13.101v-.934a1.3 1.3 0 0 1 1.3-1.3h5.477l.057-.098L13.018.793l1.489.89-5.328 8.88-.182.304h14.006l-.182-.304-5.33-8.88 1.49-.891z"
        />
        <path
          fill="url(#pattern0_2694_11214)"
          d="M12 17.05h9a.95.95 0 0 1 .95.95v6A3.95 3.95 0 0 1 18 27.95h-3A3.95 3.95 0 0 1 11.05 24v-6a.95.95 0 0 1 .95-.95"
        />
        <path
          stroke="url(#paint0_linear_2694_11214)"
          strokeWidth="0.1"
          d="M12 17.05h9a.95.95 0 0 1 .95.95v6A3.95 3.95 0 0 1 18 27.95h-3A3.95 3.95 0 0 1 11.05 24v-6a.95.95 0 0 1 .95-.95Z"
        />
        <path stroke="url(#paint1_linear_2694_11214)" d="M0 13.722h32" />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2694_11214"
          x1="11.374"
          x2="21.626"
          y1="17"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="0.515" stopColor="#fff" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2694_11214"
          x1="0"
          x2="32"
          y1="14.722"
          y2="14.722"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="0.024" stopColor="#fff" />
          <stop offset="0.515" stopColor="#fff" />
          <stop offset="0.971" stopColor="#fff" />
          <stop offset="1" />
        </linearGradient>
        <clipPath id="clip0_2694_11214">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
        <pattern
          id="pattern0_2694_11214"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#image0_2694_11214"
            transform="matrix(.0058 0 0 .00583 -.312 -.28)"
          />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,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"
          id="image0_2694_11214"
          width="283"
          height="277"
          preserveAspectRatio="none"
        />
      </defs>
    </svg>
  );
}
