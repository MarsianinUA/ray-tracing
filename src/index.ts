import { writeToColor, writeToFile } from './utils';
import { Color, dot, Point3, Ray, unitVector, Vec3 } from './3d-math';
import { Sphere, HittableList, HitRecord, Hittable } from '@/geometry';

function hitSphere(center: Point3, radius: number, ray: Ray) {
  const oc = center.subtract(ray.origin);
  const a = ray.direction.lengthSquared();
  const h = dot(ray.direction, oc);
  const c = oc.lengthSquared() - radius * radius;
  const discriminant = h * h - a * c;
  if (discriminant < 0) {
    return -1;
  } else {
    return (h - Math.sqrt(discriminant)) / a;
  }
}

function rayColor(ray: Ray, world: Hittable) {
  const rec = new HitRecord();
  if (world.hit(ray, 0, Infinity, rec)) {
    return new Color(
      0.5 * (rec.normal.x + 1),
      0.5 * (rec.normal.y + 1),
      0.5 * (rec.normal.z + 1),
    );
  }

  const unit_direction = unitVector(ray.direction);
  const a = 0.5 * (unit_direction.y + 1);
  return new Color(1, 1, 1)
    .multiply(1 - a)
    .add(new Color(0.5, 0.7, 1).multiply(a));
}

function main() {
  // Image
  const aspect_ratio = 16 / 9;
  const image_width = 400;
  const image_height = Math.floor(image_width / aspect_ratio);

  // World
  const world = new HittableList();

  world.add(new Sphere(new Point3(0, 0, -1), 0.5));
  world.add(new Sphere(new Point3(0, -100.5, -1), 100));

  // Camera
  const focal_length = 1;
  const viewport_height = 2;
  const viewport_width = viewport_height * aspect_ratio; // Исправлено!

  const camera_center = new Point3(0, 0, 0);
  const viewport_up = new Point3(viewport_width, 0, 0);
  const viewport_down = new Point3(0, -viewport_height, 0);

  const pixel_delta_up = viewport_up.divide(image_width);
  const pixel_delta_down = viewport_down.divide(image_height);

  const viewport_upper_left = camera_center
    .subtract(new Vec3(0, 0, focal_length))
    .subtract(viewport_up.divide(2))
    .subtract(viewport_down.divide(2));

  const pixel00_loc = viewport_upper_left.add(
    pixel_delta_up.add(pixel_delta_down).multiply(0.5),
  );

  let data = `P3\n${image_width} ${image_height}\n255\n`;

  for (let j = 0; j < image_height; j++) {
    for (let i = 0; i < image_width; i++) {
      const pixel_center = pixel00_loc
        .add(pixel_delta_up.multiply(i))
        .add(pixel_delta_down.multiply(j));
      const ray_direction = pixel_center.subtract(camera_center);
      const ray = new Ray(camera_center, ray_direction);
      const pixel_color = rayColor(ray, world);

      data += writeToColor(pixel_color);
    }
  }
  writeToFile(data);
}

main();
