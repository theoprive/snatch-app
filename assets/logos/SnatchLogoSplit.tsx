import React, { useEffect } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';

const AnimatedG = Animated.createAnimatedComponent(G);

type Props = {
  width?: number;
  height?: number;
};

export default function SnatchLogoAnimated({ width = 430, height = 470 }: Props) {
  const offset = useSharedValue(0);

  useEffect(() => {
    // Démarre soudé
    offset.value = 0;

    // Se casse rapidement après un court délai
    setTimeout(() => {
      offset.value = withTiming(12, { duration: 100 });
    }, 300);
  }, []);

  const leftProps = useAnimatedProps(() => ({
    transform: [
      { translateX: -offset.value },
      { translateY: -offset.value * 0.5 }, // haut gauche
    ],
  }));

  const rightProps = useAnimatedProps(() => ({
    transform: [
      { translateX: offset.value },
      { translateY: offset.value * 0.5 }, // bas droite
    ],
  }));

  return (
    <Svg width={width} height={height} viewBox="0 0 430 470">
      <AnimatedG animatedProps={leftProps}>
        <Path
          d="M191.436 330.974L251.38 141.393L227.32 139.941L194.548 237.428L147.671 235.146V211.501L199.318 200.507L194.548 136L73 148.238L77.5632 323.507L191.436 330.974Z"
          fill="white"
        />
      </AnimatedG>
      <AnimatedG animatedProps={rightProps}>
        <Path
          d="M215.497 332.633L190.399 330.974L250.344 141.393L355.09 148.238L356.127 325.996L246.195 334.5L242.876 270.407L284.153 263.148L282.286 237.635L247.854 234.731L215.497 332.633Z"
          fill="white"
        />
      </AnimatedG>
    </Svg>
  );
}
