import 'pixi';
import 'p2';
import Phaser from 'phaser';

const { Point } = Phaser;

import VectorPath from './vector-path';

describe('VectorPath', () => {
  describe('getFinalSpeedTime()', () => {
    it('should return the time needed to reach full speed', () => {
      const tv = new VectorPath({
        initVel: new Point(100, 0),
        finalVel: new Point(0, 100),
        accel: 100
      });
      const time = tv.getFinalSpeedTime();
      time.should.be.approximately(1.414, 0.001);
    });
  });

  describe('getPos(time)', () => {
    it('should work', () => {
      const vectorPath = new VectorPath({
        time: 10,
        pos: { x: 100, y: 100 },
        initVel: { x: 100, y: 0 },
        finalVel: { x: 0, y: -100 },
        accel: 100
      });

      let pos;
      pos = vectorPath.getPos(10);
      pos.should.have.properties({ x: 100, y: 100 });

      pos = vectorPath.getPos(10.5);
      pos.x.should.be.approximately(141.1, 0.1);
      pos.y.should.be.approximately(91.1, 0.1);

      pos = vectorPath.getPos(10.70710678118655);
      pos.x.should.be.approximately(153, 0.1);
      pos.y.should.be.approximately(82.3, 0.1);

      pos = vectorPath.getPos(11);
      pos.x.should.be.approximately(164.6, 0.1);
      pos.y.should.be.approximately(64.6, 0.1);

      pos = vectorPath.getPos(11.414213562373095);
      pos.x.should.be.approximately(170.7, 0.1);
      pos.y.should.be.approximately(29.2, 0.1);

      pos = vectorPath.getPos(11.5);
      pos.x.should.be.approximately(170.7, 0.1);
      pos.y.should.be.approximately(20.7, 0.1);

      pos = vectorPath.getPos(12);
      pos.x.should.be.approximately(170.7, 0.1);
      pos.y.should.be.approximately(-29.2, 0.1);
    });
  });

  describe('getVelocity(time)', () => {
    it('should work', () => {
      const vectorPath = new VectorPath({
        time: 10,
        pos: { x: 100, y: 100 },
        initVel: { x: 100, y: 0 },
        finalVel: { x: 0, y: -100 },
        accel: 100
      });

      let velocity;
      velocity = vectorPath.getVelocity(10);
      velocity.should.have.properties({ x: 100, y: 0 });

      velocity = vectorPath.getVelocity(10.5);
      velocity.x.should.be.approximately(64.6, 0.1);
      velocity.y.should.be.approximately(-35.3, 0.1);

      velocity = vectorPath.getVelocity(10.70710678118655);
      velocity.x.should.be.approximately(50, 0.1);
      velocity.y.should.be.approximately(-50, 0.1);

      velocity = vectorPath.getVelocity(11);
      velocity.x.should.be.approximately(29.2, 0.1);
      velocity.y.should.be.approximately(-70.7, 0.1);

      velocity = vectorPath.getVelocity(11.414213562373095);
      velocity.should.have.properties({ x: 0, y: -100 });

      velocity = vectorPath.getVelocity(11.5);
      velocity.should.have.properties({ x: 0, y: -100 });
    });
  });
});
