/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 48,
        y: 50
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 46,
        y: 53
      })
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.KEY_PRESSED, { key: "c" }, this.whenKeyCPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "a" }, this.whenKeyAPressed),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.KEY_PRESSED, { key: "b" }, this.whenKeyBPressed)
    ];
  }

  *whenKeyCPressed() {
    while (!this.touching("mouse")) {
      this.effects.color += 30;
      yield;
    }
  }

  *whenKeyAPressed() {
    for (let i = 0; i < 3; i++) {
      yield* this.sayAndWait("Boo", 1);
      yield* this.wait(1);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      this.move(10);
      this.effects.color += 25;
      if (this.touching("edge")) {
        yield* this.sayAndWait("Hello!", 2);
      }
      yield;
    }
  }

  *whenKeyBPressed() {
    while (true) {
      this.move(10);
      /* TODO: Implement motion_ifonedgebounce */ null;
      yield;
    }
  }
}
