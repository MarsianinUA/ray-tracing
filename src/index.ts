import { writeToColor, writeToFile } from './utils';
import { Color, Point3, Ray, unitVector, Vec3 } from './3d-math';

function ray_color(r: Ray) {
  const unit_direction = unitVector(r.direction);
  const a = 0.5 * (unit_direction.y + 1);
  return new Color(1, 1, 1)
    .multiply(1 - a)
    .add(new Color(0.5, 0.7, 1).multiply(a));
}

function main() {
  // Image
  const aspect_ratio = 16 / 9;
  const image_width = 400;

  let image_height = Math.floor(image_width / aspect_ratio);
  image_height = image_height < 1 ? 1 : image_height;

  // Camera

  const focal_length = 1;
  const viewport_height = 2;
  const viewport_width =
    viewport_height * Math.floor(image_width / image_height);
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
      const pixel_color = ray_color(ray);

      data += writeToColor(pixel_color);
    }
  }
  writeToFile(data);
}

main();
