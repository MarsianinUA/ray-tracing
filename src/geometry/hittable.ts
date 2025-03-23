import { dot, Ray, Vec3 } from '@/3d-math';

export class HitRecord {
  p: Vec3;
  normal: Vec3;
  t: number;
  frontFace: boolean;

  constructor() {
    this.p = new Vec3(0, 0, 0);
    this.normal = new Vec3(0, 0, 0);
    this.t = 0;
    this.frontFace = false;
  }

  setFaceNormal(ray: Ray, outwardNormal: Vec3): void {
    this.frontFace = dot(ray.direction, outwardNormal) < 0;
    this.normal = this.frontFace ? outwardNormal : outwardNormal.negate;
  }
}

export abstract class Hittable {
  abstract hit(ray: Ray, tMin: number, tMax: number, rec: HitRecord): boolean;
}
