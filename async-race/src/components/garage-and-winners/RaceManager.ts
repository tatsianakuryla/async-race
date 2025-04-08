import type { GarageItem } from '../car/Garage-item';
import { Modal } from '../ui/modal/modal';
import { Winners } from './Winners';

type RaceData = {
  id: number;
  time: number;
  name: string;
};

export class RaceManager {
  private raceDurations: RaceData[] = [];

  public static async resetRace(
    cars: Record<number, GarageItem>,
  ): Promise<void> {
    const resetPromises = Object.entries(cars).map(([id, carItem]) =>
      carItem.animation.stopAnimation(+id, carItem.svg),
    );

    Object.values(cars).forEach((carItem) => carItem.enableButtonsAfterRace());

    await Promise.all(resetPromises);
  }

  public async startRace(cars: Record<number, GarageItem>): Promise<void> {
    this.raceDurations = [];

    const carsList = Object.entries(cars);

    carsList.forEach(([, carItem]) => carItem.disableButtonsForRace());

    await Promise.all(
      carsList.map(([id, carItem]) =>
        carItem.animation.prepareForStart(
          +id,
          carItem.svgContainer,
          carItem.svg,
        ),
      ),
    );

    requestAnimationFrame(() => {
      carsList.forEach(([id, carItem]) => {
        const numericId = +id;
        carItem.animation.runAnimation(numericId, carItem.svg);
        carItem.raceTime = carItem.animation.duration;
        this.raceDurations.push({
          id: numericId,
          time: carItem.animation.duration,
          name: carItem.carName,
        });
      });

      this._handleWinner();
    });
  }

  private async _handleWinner(): Promise<void> {
    const [winner] = [...this.raceDurations].sort((a, b) => a.time - b.time);
    const maxTime = Math.max(...this.raceDurations.map((r) => r.time));
    const timeInSec = (winner.time / 1000).toFixed(2);

    const modal = new Modal(
      `🏁 The winner: ${winner.name}! ID: ${winner.id}, Time: ${timeInSec}s`,
    );

    setTimeout(() => modal.open(), maxTime + 1000);
    await Winners.saveWinner({ id: winner.id, time: +timeInSec });
  }
}
