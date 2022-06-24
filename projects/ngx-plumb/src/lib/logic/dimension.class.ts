export class Dimension {
  
  readonly width: number;
  readonly height: number;

  static NONE: Dimension = new Dimension(0, 0);

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
  }

  get min() : number {
    return this.height < this.width ? this.height : this.width;
  }

  get max() : number {
    return this.height > this.width ? this.height : this.width;
  }

  get ratio() : number {
    return this.width / this.height;
  }

}
