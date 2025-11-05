import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const FilterIcon: React.FC<Props> = ({
  width = 24,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Ligne du haut */}
      <Line
        x1="3"
        y1="7"
        x2="21"
        y2="7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Cercle du haut */}
      <Circle
        cx="8"
        cy="7"
        r="3"
        fill={color}
      />

      {/* Ligne du bas */}
      <Line
        x1="3"
        y1="17"
        x2="21"
        y2="17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Cercle du bas */}
      <Circle
        cx="16"
        cy="17"
        r="3"
        fill={color}
      />
    </Svg>
  );
};

export default FilterIcon;
