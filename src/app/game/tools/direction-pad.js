const Phaser = window.Phaser;
const {Point} = Phaser;

class DirectionPad {

  constructor({limit, speed}) {
    this.limit = limit;
    this.speed = speed;

    this.axis = new Point();
    this.position = new Point();
  }

  update(physicsElapsed) {
    const direction = this.axis.clone();
    const newPos = this.position.clone();

    direction.setMagnitude(this.limit);

    // Move newPos towards point
    const diff = Point.subtract(direction, newPos);

    const accelerate = physicsElapsed * this.speed;
    const clippedAcc = diff.getMagnitude() < accelerate ? diff.getMagnitude() : accelerate;

    diff.setMagnitude(clippedAcc);
    Point.add(newPos, diff, newPos);

    // Max limit
    const mag = newPos.getMagnitude();
    newPos.setMagnitude(Math.min(mag, this.limit));

    this.position.copyFrom(newPos);
  }
}

export default DirectionPad;
