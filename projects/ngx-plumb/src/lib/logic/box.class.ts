import { Dimension } from './dimension.class';
import { Position } from './position.class';

export class Box {
  readonly center: Position;
  readonly dimension: Dimension;

  static NONE: Box = new Box(Position.ORIGIN, Dimension.NONE);

  constructor(center: Position, dimension: Dimension) {
    this.center = center;
    this.dimension = dimension;
  }

  get width(): number {
    return this.dimension.width;
  }

  get height(): number {
    return this.dimension.height;
  }

  get centerX(): number {
    return this.center.x;
  }

  get centerY(): number {
    return this.center.y;
  }

  get left(): number {
    const w2 = this.dimension.width / 2;
    return this.center.x - w2;
  }

  get right(): number {
    const w2 = this.dimension.width / 2;
    return this.center.x + w2;
  }

  get top(): number {
    const h2 = this.dimension.height / 2;
    return this.center.y - h2;
  }

  get bottom(): number {
    const h2 = this.dimension.height / 2;
    return this.center.y + h2;
  }

  get leftTop(): Position {
    return new Position(this.left, this.top);
  }

  get rightTop(): Position {
    return new Position(this.right, this.top);
  }

  get leftBottom(): Position {
    return new Position(this.left, this.bottom);
  }

  get rightBottom(): Position {
    return new Position(this.right, this.bottom);
  }

  relativeInside(dimension: Dimension, position: Position): Position {
    const rx = position.x / dimension.width;
    const ry = position.y / dimension.height;
    const px = this.left + this.dimension.width * rx;
    const py = this.top + this.dimension.height * ry;
    return new Position(px, py);

  }

  toString(): string {
    return `LTRB :: WH ${this.left} ${this.top} ${this.right} ${this.bottom} :: ${this.width} ${this.height}`;
  }
}
