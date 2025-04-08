import { RANDOM_CAR_BRANDS, RANDOM_CAR_COLORS, RANDOM_CAR_MODELS } from '../..';
import type { Car } from '../../types';

import { getRandomIndex, textToUpperCase } from '../../utils/helpers';
export class CarGenerator {
  public static generate(): Car {
    const brand = RANDOM_CAR_BRANDS[getRandomIndex()];
    const model = RANDOM_CAR_MODELS[getRandomIndex()];
    const color = RANDOM_CAR_COLORS[getRandomIndex()];

    return {
      id: 0,
      name: `${textToUpperCase(brand)} ${textToUpperCase(model)}`,
      color,
    };
  }

  public static generateBatch(count: number): Car[] {
    return Array.from({ length: count }, () => this.generate());
  }
}
