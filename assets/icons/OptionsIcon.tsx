import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function OptionsIcon({ width = 24, height = 24, color = '#fff' }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="5" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2" fill={color} />
      <Circle cx="12" cy="19" r="2" fill={color} />
    </Svg>
  );
}
