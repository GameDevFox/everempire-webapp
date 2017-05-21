import 'pixi';
import 'p2';
import Phaser from 'phaser';

const {Point} = Phaser;

export function buildTravelVector() {
  return {
    time: 0,
    pos: new Point(),
    velocity: new Point(),
    axis: new Point(),
    accel: 800
  };
}

export function getFinalSpeedTime(velocity, axis, accel) {
  const length = Point.subtract(axis, velocity).getMagnitude();
  const time = length / accel;
  return time;
}

export function getInvSlopeArea(x, theta) {
  const area = (x * x) * theta;
  return area - getSlopeArea(x, theta);
}

export function getInterVector(start, end, frames, theta) {
  const framesP = new Point(frames, frames);

  const diff = Point.subtract(end, start);
  const accel = Point.divide(diff, framesP);

  accel.x = isNaN(accel.x) ? 0 : accel.x;
  accel.y = isNaN(accel.y) ? 0 : accel.y;

  const units = Point.multiply(framesP, new Point(theta, theta));
  const baseArea = Point.multiply(units, start);
  const slopeArea = Point.divide(Point.multiply(Point.multiply(units, units), accel), new Point(2, 2));

  const totalArea = Point.add(baseArea, slopeArea);
  return totalArea;
}

export function getPos(time, travelVector) {
  const {time: tTime, axis, velocity, pos, accel} = travelVector;
  const delta = time - tTime;

  // Get theta
  const fsTime = getFinalSpeedTime(velocity, axis, accel);
  const atFullSpeed = delta > fsTime;
  const theta = atFullSpeed ? 1 : delta / fsTime;

  // Get inter vector and apply to pos
  const vectorAB = getInterVector(velocity, axis, fsTime, theta);
  const finalPos = Point.add(pos, vectorAB);

  // Extend past the final point
  if(atFullSpeed) {
    const postDelta = delta - fsTime;
    const scaledVec = Point.multiply(axis, new Point(postDelta, postDelta));
    Point.add(finalPos, scaledVec, finalPos);
  }

  return finalPos;
}

export function getSlopeArea(x, theta) {
  const area = x * theta;
  return (area * area) / 2;
}

export function getVelocity(time, travelVector) {
  const {time: tTime, axis, velocity, accel} = travelVector;
  const delta = time - tTime;

  // Get theta
  const fsTime = getFinalSpeedTime(velocity, axis, accel);
  if(delta > fsTime)
    return axis;

  const theta = delta / fsTime;
  const invTheta = 1 - theta;

  const vecA = Point.multiply(velocity, new Point(invTheta, invTheta));
  const vecB = Point.multiply(axis, new Point(theta, theta));

  const vector = Point.add(vecA, vecB);
  return vector;
}

export function matchSign(before, after) {
  if(
    (before < 0 && after > 0) ||
    (before > 0 && after < 0)
  ) return -after;

  return after;
}
