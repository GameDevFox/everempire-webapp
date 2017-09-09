import 'pixi';
import 'p2';
import Phaser from 'phaser';

const { Point } = Phaser;

export default class VectorPath {
  constructor(props = {}) {
    this.time = 0;
    this.pos = new Point();
    this.initVel = new Point();
    this.finalVel = new Point();
    this.accel = 800;

    this.copyFrom(props);
  }

  copyFrom({ time, pos, initVel, finalVel, accel }) {
    if(time)
      this.time = time;
    if(pos)
      this.pos.copyFrom(pos);
    if(initVel)
      this.initVel.copyFrom(initVel);
    if(finalVel)
      this.finalVel.copyFrom(finalVel);
    if(accel)
      this.accel = accel;
  }

  getFinalSpeedTime() {
    const length = Point.subtract(this.finalVel, this.initVel).getMagnitude();
    const time = length / this.accel;
    return time;
  }

  getPos(time) {
    const delta = time - this.time;

    // Get theta
    const fsTime = this.getFinalSpeedTime();
    const atFullSpeed = delta > fsTime;
    const theta = atFullSpeed ? 1 : delta / fsTime;

    // Get inter vector and apply to pos
    const vectorAB = getInterVector(this.initVel, this.finalVel, fsTime, theta);
    const finalPos = Point.add(this.pos, vectorAB);

    // Extend past the final point
    if(atFullSpeed) {
      const postDelta = delta - fsTime;
      const scaledVec = Point.multiply(this.finalVel, { x: postDelta, y: postDelta });
      Point.add(finalPos, scaledVec, finalPos);
    }

    return finalPos;
  }

  getVelocity(time) {
    const delta = time - this.time;

    // Get theta
    const fsTime = this.getFinalSpeedTime();
    if(delta > fsTime)
      return this.finalVel;

    const theta = delta / fsTime;
    const invTheta = 1 - theta;

    const vecA = Point.multiply(this.initVel, { x: invTheta, y: invTheta });
    const vecB = Point.multiply(this.finalVel, { x: theta, y: theta });

    const vector = Point.add(vecA, vecB);
    return vector;
  }

  updateFinalVel(time, finalVel) {
    const position = this.getPos(time);
    const initVel = this.getVelocity(time);

    this.time = time;
    this.pos.copyFrom(position);
    this.initVel.copyFrom(initVel);
    this.finalVel.copyFrom(finalVel);
  }
}

function getInterVector(start, end, frames, theta) {
  const framesP = { x: frames, y: frames };

  const diff = Point.subtract(end, start);
  const accel = Point.divide(diff, framesP);

  accel.x = isNaN(accel.x) ? 0 : accel.x;
  accel.y = isNaN(accel.y) ? 0 : accel.y;

  const units = Point.multiply(framesP, { x: theta, y: theta });
  const baseArea = Point.multiply(units, start);
  const slopeArea = Point.divide(Point.multiply(Point.multiply(units, units), accel), { x: 2, y: 2 });

  const totalArea = Point.add(baseArea, slopeArea);
  return totalArea;
}
