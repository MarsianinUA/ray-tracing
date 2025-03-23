import { Hittable } from './hittable';
import { dot, Point3, Ray } from '@/3d-math';

export class Sphere extends Hittable {
  private readonly center: Point3;
  private readonly radius: number;

  constructor(center: Point3, radius: number) {
    super();
    this.center = center;
    this.radius = Math.max(0, radius);
  }

  hit(ray: Ray, tMin: number, tMax: number, rec: any): boolean {
    const oc = this.center.subtract(ray.origin);
    const a = ray.direction.lengthSquared();
    const half_b = dot(ray.direction, oc);
    const c = oc.lengthSquared() - this.radius * this.radius;

    const discriminant = half_b * half_b - a * c;
    if (discriminant < 0) return false;

    const sqrt_d = Math.sqrt(discriminant);
    let root = (half_b - sqrt_d) / a;
    if (root <= tMin || tMax <= root) {
      root = (half_b + sqrt_d) / a;
      if (root <= tMin || tMax <= root) {
        return false;
      }
    }
    rec.t = root;
    rec.p = ray.at(rec.t);
    const outwardNormal = rec.p.subtract(this.center).divide(this.radius);
    rec.setFaceNormal(ray, outwardNormal);
    return true;
  }
}
