// assets/icons/navigations/ChatIcon.tsx
import React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export default function ChatIcon({
  width = 24,
  height = 24,
  fill = '#B3B3B3',
}: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.84442 18.8448C6.49357 19.0313 6.07247 18.768 6.08644 18.3709L6.41648 8.99008C6.43045 8.59302 6.86901 8.35998 7.20589 8.57061L15.1649 13.5469C15.5018 13.7575 15.4843 14.2538 15.1335 14.4402L6.84442 18.8448Z"
        fill={fill}
      />
      <Ellipse cx="10.9064" cy="10.5161" rx="8.12903" ry="6.51613" fill={fill} />
      <Path
        d="M16.0508 8.98926C12.9934 8.98942 10.346 10.9914 10.3457 13.6475C10.3457 16.3038 12.9932 18.3065 16.0508 18.3066C19.1085 18.3066 21.7568 16.3039 21.7568 13.6475C21.7565 10.9913 19.1084 8.98926 16.0508 8.98926Z"
        fill={fill}
        stroke="#121212"
        strokeWidth={0.857123}
      />
      <Path
        d="M18.6871 19.0553C18.9148 19.1763 19.1882 19.0054 19.1791 18.7476L18.9649 12.6581C18.9558 12.4003 18.6711 12.249 18.4524 12.3858L13.2858 15.6161C13.0672 15.7528 13.0785 16.075 13.3062 16.196L18.6871 19.0553Z"
        fill={fill}
      />
    </Svg>
  );
}
