export class Keycap {
  public style = {
    boxShadow:
      '0px 2px 4px 0px rgba(227, 193, 216, 0.6),2px -2px 2px 0px rgba(249, 236, 253, 1) inset',
  };
  public x: number = 0;
  public delay: number = 0;
  public speed: number = 0;
  public rotate: number = 0;
  public key: number;

  constructor(public id: number, public letter: string) {
    this.regenerateProperties();
    this.key = 0;
  }

  regenerateProperties() {
    this.x = Math.random() * 80 + 10;
    this.delay = Math.random() * 2;
    this.speed = Math.random() * 5 + 5;
    this.rotate = Math.random() * 360;
    this.key++;
  }
}
