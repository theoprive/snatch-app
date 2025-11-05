import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function BookmarkIcon({ width = 24, height = 24, color = '#fff' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 4v16l6-6 6 6V4H6z"
        fill={color}
      />
    </Svg>
  );
}
