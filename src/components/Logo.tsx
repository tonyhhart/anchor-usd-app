import * as React from 'react';
import Svg, { G, Defs, Rect, Path, Circle, Mask, MarkerUnits, ClipPath } from 'react-native-svg';

function Logo(props: { width?: number; height?: number }) {
  return (
    <Svg {...props} viewBox="0 0 1024 1024">
      <Defs>
        <ClipPath id="clip0">
          <Rect width="1024" height="1024" fill="white" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#clip0)">
        <Rect width="1024" height="1024" fill="#F5F5F7" />
        <Path d="M855 -1V1024" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M684 -1V1024" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M513 -1V1024" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M342 -1V1024" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M171 -1V1024" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M1024 854L-1 854" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M1024 683L-1 683" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M1024 512L-1 512" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M1024 341L-1 341" stroke="#DDDDE1" stroke-width="6" />
        <Path d="M1024 170L-1 170" stroke="#DDDDE1" stroke-width="6" />
        <Circle cx="512" cy="511" r="337" stroke="#CFCFD5" stroke-width="12" />
        <Circle cx="512" cy="512" r="166" stroke="#CFCFD5" stroke-width="12" />
        <Circle cx="512" cy="512" r="438" stroke="#CFCFD5" stroke-width="12" />
        <Rect width="1024" height="1024" fill="#21D23E" />
        <Path
          d="M604.016 678.75H416.125L383.312 785H236.828L445.422 216.25H574.328L784.484 785H637.219L604.016 678.75ZM448.938 572.891H571.203L509.875 375.625L448.938 572.891Z"
          fill="white"
        />
        <Circle cx="-137" cy="-126" r="1101" fill="white" fillOpacity="0.2" />
        <Mask
          id="mask0"
          maskType="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="1024"
          height="1024"
        >
          <Rect width="1024" height="1024" fill="#21D23E" />
        </Mask>
        <G mask="url(#mask0)" />
      </G>
    </Svg>
  );
}

Logo.defaultProps = { width: 1024, height: 1024 };

export default Logo;
