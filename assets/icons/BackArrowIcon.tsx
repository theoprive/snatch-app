import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function BackArrowIcon({ width = 18   , height = 18, fill = '#FFF' }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
