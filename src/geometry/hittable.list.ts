import { HitRecord, Hittable } from '@/geometry/hittable';
import { Ray } from '@/3d-math';

export class HittableList extends Hittable {
  objects: Hittable[] = [];

  constructor(object?: Hittable) {
    super();
    if (object) {
      this.add(object);
    }
  }

  clear(): void {
    this.objects = [];
  }

  add(object: Hittable): void {
    this.objects.push(object);
  }

  hit(ray: Ray, tMin: number, tMax: number, rec: HitRecord): boolean {
    const tempRec = new HitRecord();
    let hitAnything = false;
    let closestSoFar = tMax;

    for (const object of this.objects) {
      if (object.hit(ray, tMin, closestSoFar, tempRec)) {
        hitAnything = true;
        closestSoFar = tempRec.t;
        Object.assign(rec, tempRec);
      }
    }

    return hitAnything;
  }
}
