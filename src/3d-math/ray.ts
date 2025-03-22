import { Point3, Vec3 } from './vec3';

export class Ray {
  private readonly orig: Point3;
  private readonly dir: Vec3;

  constructor(origin: Point3, direction: Vec3) {
    this.orig = origin;
    this.dir = direction;
  }

  public get origin() {
    return this.orig;
  }
  public get direction() {
    return this.dir;
  }

  public at(t: number) {
    return this.origin.add(this.direction.multiply(t));
  }
}
