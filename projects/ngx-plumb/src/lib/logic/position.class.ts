
export class Position {
  readonly x: number;
  readonly y: number;

  static ORIGIN: Position = new Position(0, 0);

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  translate(tx: number, ty: number): Position {
    return new Position(this.x + tx, this.y + ty);
  }
}