import { getAngle, getMidpoint, getRightestPointer } from '../utils';

const UNFOLDED_ANGLE = 180;
const RIGHT_ANGLE = 90;

class RotateGesture {
  constructor() {
    this.prevAngle = 0;
    this.POINTERS_COUNT = 2;

    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerCancel = this.onPointerCancel.bind(this);
  }

  perform(pointers, event, state) {
    if (pointers.length !== this.POINTERS_COUNT) return state;

    const { prevAngle } = this;

    const currentCenter = getMidpoint(
      pointers[0].clientX,
      pointers[1].clientX,
      pointers[0].clientY,
      pointers[1].clientY
    );
    const rightestPointer = getRightestPointer(pointers);

    const currentAngle = getAngle(
      currentCenter.x,
      currentCenter.y,
      rightestPointer.x,
      rightestPointer.y
    );

    if (prevAngle === 0) {
      this.prevAngle = currentAngle;
      return state;
    }

    let distance = prevAngle - currentAngle;

    if (distance > RIGHT_ANGLE) distance -= UNFOLDED_ANGLE;
    else if (distance < -RIGHT_ANGLE) distance += UNFOLDED_ANGLE;

    this.prevAngle = currentAngle;

    return Object.assign({}, state, {
      angleDistance: distance
    });
  }

  reset() {
    this.prevAngle = 0;
  }

  onPointerUp() {
    this.reset();
  }

  onPointerCancel() {
    this.reset();
  }
}

export default RotateGesture;
