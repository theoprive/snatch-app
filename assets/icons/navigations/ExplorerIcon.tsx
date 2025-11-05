// assets/icons/navigations/ExplorerIcon.tsx
import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { Colors } from '../../../theme/colors';

interface Props {
  width?: number;
  height?: number;
  color?: string;        // couleur dynamique pour tout ce qui doit changer
  backgroundColor?: string; // couleur du cercle extérieur (tabBar)
}

export default function ExplorerIcon({
  width = 24,
  height = 24,
  color = Colors.button, // gris par défaut
  backgroundColor = '#121212',  // couleur de ton tabBar
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      {/* Les 3 carrés */}
      <Path
        d="M1.91 3.75C1.91 3.33579 2.246 3 2.66 3H8.833C9.248 3 9.583 3.33579 9.583 3.75V9.80892C9.583 10.2231 9.248 10.5589 8.833 10.5589H2.66C2.246 10.5589 1.91 10.2231 1.91 9.80892V3.75Z"
        fill={color}
      />
      <Path
        d="M1.91 12.3888C1.91 11.9746 2.246 11.6388 2.66 11.6388H8.833C9.248 11.6388 9.583 11.9746 9.583 12.3888V18.4477C9.583 18.8619 9.248 19.1977 8.833 19.1977H2.66C2.246 19.1977 1.91 18.8619 1.91 18.4477V12.3888Z"
        fill={color}
      />
      <Path
        d="M10.68 3.75C10.68 3.33579 11.015 3 11.43 3H17.603C18.017 3 18.353 3.33579 18.353 3.75V9.80892C18.353 10.2231 18.017 10.5589 17.603 10.5589H11.43C11.015 10.5589 10.68 10.2231 10.68 9.80892V3.75Z"
        fill={color}
      />

      {/* Loupe */}
      <Circle
        cx={14.66}
        cy={14.25}
        r={5.3}                   // cercle extérieur
        stroke={backgroundColor}   // couleur tabBar
        strokeWidth={2.9}
      />
      <Circle
        cx={14.66}
        cy={14.25}
        r={4.125}                 // cercle intérieur
        stroke={color}             // couleur dynamique
        strokeWidth={2.25}
      />
      <Rect
        x={18.34}
        y={15.2246}
        width={4.944}
        height={2.1936}
        rx={1.09678}
        transform="rotate(40.72 18.34 15.2246)"
        fill={color}               // poignée dynamique
      />
    </Svg>
  );
}
