import 'pixi';
import 'p2';
import Phaser from 'phaser';

const {Point} = Phaser;

import {
  getFinalSpeedTime, getInterVector, getInvSlopeArea,
  getPos, getSlopeArea, getVelocity,
  matchSign
} from './math';

describe('math', () => {
  describe('getFinalSpeedTime(axis, velocity, accel)', () => {
    it('should return the time needed to reach full speed with the given acceleration', () => {
      const time = getFinalSpeedTime(new Point(100, 0), new Point(0, 100), 100);
      time.should.be.approximately(1.414, 0.001);
    });
  });

  describe('getIterVector(velocity, axis, theta)', () => {
    it('should work', () => {
      const startVel = new Point(100, 0);
      const endVel = new Point(0, -100);

      let vector;
      vector = getInterVector(startVel, endVel, 0);
      vector.should.have.properties({x: 0, y: 0});

      vector = getInterVector(startVel, endVel, 0.25);
      vector.should.have.properties({x: 21.875, y: -3.125});

      vector = getInterVector(startVel, endVel, 0.5);
      vector.should.have.properties({x: 37.50, y: -12.50});

      vector = getInterVector(startVel, endVel, 0.75);
      vector.should.have.properties({x: 46.875, y: -28.125});

      vector = getInterVector(startVel, endVel, 1);
      vector.should.have.properties({x: 50.00, y: -50.00});
    });
  });

  describe('getPos(time, travelVector)', () => {
    it('should work', () => {
      const travelVector = {
        time: 10,
        pos: new Point(100, 100),
        velocity: new Point(100, 0),
        axis: new Point(0, -100).setMagnitude(100),
        accel: 100
      };

      let pos;
      pos = getPos(10, travelVector);
      pos.should.have.properties({x: 100, y: 100});

      pos = getPos(10.5, travelVector);
      pos.x.should.be.approximately(129.1, 0.1);
      pos.y.should.be.approximately(93.7, 0.1);

      pos = getPos(10.70710678118655, travelVector);
      pos.x.should.be.approximately(137.5, 0.1);
      pos.y.should.be.approximately(87.5, 0.1);

      pos = getPos(11, travelVector);
      pos.x.should.be.approximately(145.7, 0.1);
      pos.y.should.be.approximately(75, 0.1);

      pos = getPos(11.414213562373095, travelVector);
      pos.x.should.be.approximately(150, 0.1);
      pos.y.should.be.approximately(50, 0.1);

      pos = getPos(11.5, travelVector);
      pos.x.should.be.approximately(150, 0.1);
      pos.y.should.be.approximately(41.4, 0.1);

      pos = getPos(12, travelVector);
      pos.x.should.be.approximately(150, 0.1);
      pos.y.should.be.approximately(-8.5, 0.1);
    });
  });

  describe('getSlopeArea(x, theta)', () => {
    it('should work', () => {
      let area;

      area = getSlopeArea(4, 0);
      area.should.eql(0);

      area = getSlopeArea(4, 0.25);
      area.should.eql(0.5);

      area = getSlopeArea(4, 0.5);
      area.should.eql(2);

      area = getSlopeArea(4, 0.75);
      area.should.eql(4.5);

      area = getSlopeArea(4, 1);
      area.should.eql(8);
    });
  });

  describe('getInvSlopeArea(x, theta)', () => {
    it('should work', () => {
      let area;

      area = getInvSlopeArea(4, 0);
      area.should.eql(0);

      area = getInvSlopeArea(4, 0.25);
      area.should.eql(3.5);

      area = getInvSlopeArea(4, 0.5);
      area.should.eql(6);

      area = getInvSlopeArea(4, 0.75);
      area.should.eql(7.5);

      area = getInvSlopeArea(4, 1);
      area.should.eql(8);
    });
  });

  describe('getVelocity(time, travelVector)', () => {
    it('should work', () => {
      const travelVector = {
        time: 10,
        pos: new Point(100, 100),
        velocity: new Point(100, 0),
        axis: new Point(0, -100).setMagnitude(100),
        accel: 100
      };

      let velocity;
      velocity = getVelocity(10, travelVector);
      velocity.should.have.properties({x: 100, y: 0});

      velocity = getVelocity(10.5, travelVector);
      velocity.x.should.be.approximately(64.6, 0.1);
      velocity.y.should.be.approximately(-35.3, 0.1);

      velocity = getVelocity(10.70710678118655, travelVector);
      velocity.x.should.be.approximately(50, 0.1);
      velocity.y.should.be.approximately(-50, 0.1);

      velocity = getVelocity(11, travelVector);
      velocity.x.should.be.approximately(29.2, 0.1);
      velocity.y.should.be.approximately(-70.7, 0.1);

      velocity = getVelocity(11.414213562373095, travelVector);
      velocity.should.have.properties({x: 0, y: -100});

      velocity = getVelocity(11.5, travelVector);
      velocity.should.have.properties({x: 0, y: -100});
    });
  });

  describe('matchSign(before, after)', () => {
    it('should work', () => {
      let number;

      number = matchSign(3, 4);
      number.should.eql(4);

      number = matchSign(-3, 4);
      number.should.eql(-4);

      number = matchSign(3, -4);
      number.should.eql(4);

      number = matchSign(-3, -4);
      number.should.eql(-4);
    });
  });
});
