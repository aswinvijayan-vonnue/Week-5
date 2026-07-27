abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;
  description(): void {
    console.log(`Area is ${+this.area().toFixed(2)}`);
    console.log(`Perimeter is ${+this.perimeter().toFixed(2)}`);
  }
  static create(type: 'circle' | 'rect' | 'triangle', ...args: number[]) {
    switch (type) {
      case 'circle':
        return new Circle(args[0]);
      case 'rect': {
        if (args.length < 2) {
          console.log('Number of arguments are less...');
          return;
        }
        return new Rectangle(args[0], args[1]);
      }
      case 'triangle': {
        if (args.length < 2) {
          console.log('Number of arguments are less....');
          return;
        }
        return new Triangle(args[0], args[1]);
      }
    }
  }
}

// const obj=new Shape() Cannot instantiated abstract class

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area() {
    return Math.PI * this.radius ** 2;
  }
  perimeter(): number {
    return Math.PI * 2 * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    public width: number,
    public height: number
  ) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(
    public base: number,
    public height: number
  ) {
    super();
  }
  area(): number {
    return 0.5 * this.base * this.height;
  }
  perimeter(): number {
    const diag = Math.sqrt(this.base ** 2 + this.height ** 2);
    return this.base + this.height + diag;
  }
}

const tri = Shape.create('triangle', 3, 4);
const cir = Shape.create('circle', 7);
const rect = Shape.create('rect', 10, 20);

tri?.description();
cir?.description();
rect?.description();
