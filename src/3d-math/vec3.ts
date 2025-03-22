export class Vec3 {
  private e: number[] = [0, 0, 0];

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.e[0] = x;
    this.e[1] = y;
    this.e[2] = z;
  }

  public get x() {
    return this.e[0];
  }
  public get y() {
    return this.e[1];
  }
  public get z() {
    return this.e[2];
  }

  public get negate() {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  public getForNumber(i: number) {
    if (i < 0 || i > 2) {
      throw new Error('Outside the array');
    }
    return this.e[i];
  }

  public add(v: Vec3 | number) {
    if (typeof v === 'number') {
      return new Vec3(this.x + v, this.y + v, this.z + v);
    }
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  public subtract(v: Vec3 | number) {
    if (typeof v === 'number') {
      return new Vec3(this.x - v, this.y - v, this.z - v);
    }
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  public multiply(v: Vec3 | number) {
    if (typeof v === 'number') {
      return new Vec3(this.x * v, this.y * v, this.z * v);
    }
    return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
  }

  public divide(t: number) {
    return new Vec3(this.x / t, this.y / t, this.z / t);
  }

  public length() {
    return Math.sqrt(this.length_squared());
  }

  public length_squared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
}

// point3 is just an alias for vec3, but useful for geometric clarity in the code.
export class Point3 extends Vec3 {
  constructor(r: number = 0, g: number = 0, b: number = 0) {
    super(r, g, b);
  }
}

export class Color extends Vec3 {
  constructor(r: number = 0, g: number = 0, b: number = 0) {
    super(r, g, b);
  }
}

export function dot(u: Vec3, v: Vec3) {
  return u.x * v.x + u.y * v.y + u.z * v.z;
}

export function cross(u: Vec3, v: Vec3) {
  return new Vec3(
    u.y * v.z - u.z * v.y,
    u.z * v.x - u.x * v.z,
    u.x * v.y - u.y * v.x,
  );
}

export function unitVector(v: Vec3) {
  return v.divide(v.length());
}
