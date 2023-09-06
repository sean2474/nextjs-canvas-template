export class App {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.resize();
  }

  draw(mx: number, my: number) {
    // draw canvas
  }

  resize() {
    // initialize variables that require canvas size
  }
}