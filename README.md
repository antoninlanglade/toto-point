<h1 align="center">toto-points</h1>
<h3 align="center">Point class</h3>

## Features
Point class for distance, angle, vector, interval ... stuffs.

<br>

## Installation
## Installation
```sh
npm install -S antoninlanglade/toto-point
```


<br>

## Example
```js
import Point from '../src/index.js';

const p1 = new Point(0, 0);
const p2 = new Point(1, 1);
const p3 = new Point(2, 0);
const p4 = new Point(0, 2);

const p5 = new Point(-1, 1);
const p6 = new Point(0, -1);

// DISTANCE
console.log(`Distance p1 p2 ${p1.distance(p2)}`);
console.log(`Distance not sqrt p1 p2 ${p1.distanceSquared(p2)}`);
console.log(`Ditance between p1 & segment [p3, p4] ${p1.distanceWithSegment(p3, p4)}`);
console.log('Get nearest point between p1 & segment [p3, p4]', p1.pointWithSegement(p3, p4));

// VECTOR
console.log('Get vector between p1 & p2', p1.vectorWithPoint(p2));
//1.4142135623730951 distance between p1 & p2
console.log('Get point from p1 a vector p2 and a distance', p1.pointWithVectorAndDistance(p2, 1.4142135623730951));

// ANGLES
console.log('Get angle between p1 & p2', p1.angleFromPoint(p2));
console.log('Get angle between p1 & p4', p1.angleFromPoint(p4));
console.log('Get angle from p1 between p3 & p4', p1.angleWithPoints(p3, p4));
console.log('Get point from p2 rotate 90 around 0', p2.pointWithRotation(90));
console.log('Get point from p1 angle and distance', p1.pointWithAngleAndDistance(45, 1.4142135623730951));

// INTERVAL
console.log('Get points from interval [p1, p2] and number', p1.getIntervalPoints(p1, p2, 10));
console.log('Check if points p1 is inside a triangle',p1.isContainInTriangle(p2, p5, p6));
console.log('Check if points p3 is inside a triangle',p3.isContainInTriangle(p2, p5, p6));
```
<br>

## License
MIT.
