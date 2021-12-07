import React, {useMemo} from 'react';
import {Dimensions} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {line, curveBasis, curveLinear} from 'd3-shape';

// const {NAVIGATION_BOTTOM_TABS_HEIGHT} = SIZES;
const NAVIGATION_BOTTOM_TABS_HEIGHT = 60;
const {width: wWidth} = Dimensions.get('window');
const lineGenerator = line()
  .x(({x}: any) => x)
  .y(({y}: any) => y);

interface TabsShapeProps {
  tabWidth: number;
  color: string;
}

const nbTabStart = 2;
const nbTabEnd = 3;
const adjustment = 15;
const angle = 12;
const softAngle = 25;
const depth = 0.5;

export const TabsShape = ({tabWidth, color}: TabsShapeProps) => {
  const left = tabWidth * nbTabStart - adjustment;
  const right = tabWidth * nbTabEnd + adjustment;

  const d = useMemo(() => {
    const center = lineGenerator.curve(curveBasis)([
      {x: left, y: 0},
      {x: left + angle, y: 0},
      {
        x: left + softAngle,
        y: NAVIGATION_BOTTOM_TABS_HEIGHT * depth,
      },
      {
        x: right - softAngle,
        y: NAVIGATION_BOTTOM_TABS_HEIGHT * depth,
      },
      {x: right - angle, y: 0},
      {x: right, y: 0},
    ] as any);

    const back = lineGenerator.curve(curveLinear)([
      {x: right, y: 0},
      {x: right, y: NAVIGATION_BOTTOM_TABS_HEIGHT},
      {x: left, y: NAVIGATION_BOTTOM_TABS_HEIGHT},
      {x: left, y: 0},
    ] as any);

    return `${center}  ${back}`;
  }, [tabWidth, left, right]);

  return (
    <Svg width={wWidth} {...{height: NAVIGATION_BOTTOM_TABS_HEIGHT}}>
      <Path fill={color} {...{d}} />
    </Svg>
  );
};

export default TabsShape;

// export const TabsShape = ({tabWidth}: TabsShapeProps) => {
//   const d = useMemo(() => {
//     const left = lineGenerator([
//       {x: 0, y: 0},
//       {x: tabWidth * 2, y: 0},
//     ] as any);
//     const right = lineGenerator([
//       {x: tabWidth * 3, y: 0},
//       {x: wWidth, y: 0},
//       {x: wWidth, y: NAVIGATION_BOTTOM_TABS_HEIGHT},
//       {x: 0, y: NAVIGATION_BOTTOM_TABS_HEIGHT},
//       {x: 0, y: 0},
//     ] as any);

//     const center = lineGenerator.curve(curveBasis)([
//       {x: tabWidth * 2, y: 0},
//       {x: tabWidth * 2 + 5, y: 0},
//       {x: tabWidth * 2 + 15, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.45},
//       {x: tabWidth * 3 - 15, y: NAVIGATION_BOTTOM_TABS_HEIGHT * 0.45},
//       {x: tabWidth * 3 - 5, y: 0},
//       {x: tabWidth * 3, y: 0},
//     ] as any);

//     return `${left} ${center} ${right}`;
//   }, [tabWidth]);
