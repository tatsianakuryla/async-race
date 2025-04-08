import { carTransform } from '../..';
import { RaceData } from '../../types';
import type { GarageItem } from '../car/Garage-item';
import { Modal } from '../ui/modal/modal';
import { Winners } from './Winners';

export class RaceManager {
  private raceDurations: RaceData[] = [];
  private _isRaceActive = false;
  private _finishedCount = 0;

  public async resetRace(cars: Record<number, GarageItem>): Promise<void> {
    this._isRaceActive = false;
    const resetPromises = Object.entries(cars).map(([id, carItem]) =>
      carItem.animation.stopAnimation(+id, carItem.svg),
    );

    Object.values(cars).forEach((carItem) => carItem.enableButtonsAfterRace());
    carTransform.enableButtonsForEndRace();

    await Promise.all(resetPromises);
  }

  public async startRace(cars: Record<number, GarageItem>): Promise<void> {
    this.raceDurations = [];
    this._isRaceActive = true;
    this._finishedCount = 0;

    const carsList = Object.entries(cars);

    carsList.forEach(([, carItem]) => carItem.disableButtonsForRace());
    carTransform.disableButtonsForStartRace();
    await Promise.all(
      carsList.map(([id, carItem]) =>
        carItem.animation.prepareForStart(
          +id,
          carItem.svgContainer,
          carItem.svg,
        ),
      ),
    );

    carsList.forEach(([id, carItem]) => {
      const numericId = +id;

      carItem.animation.runAnimation(numericId, carItem.svg, (didFinish) => {
        if (!this._isRaceActive) return;

        if (didFinish) {
          const duration = carItem.animation.duration;
          carItem.raceTime = duration;
          this.raceDurations.push({
            id: numericId,
            time: duration,
            name: carItem.carName,
          });
        }

        this._finishedCount++;

        if (this._finishedCount === carsList.length) {
          this._handleWinner();
        }
      });
    });
  }

  private async _handleWinner(): Promise<void> {
    if (!this._isRaceActive || this.raceDurations.length === 0) return;

    const [winner] = [...this.raceDurations].sort((a, b) => a.time - b.time);
    const timeInSec = (winner.time / 1000).toFixed(2);

    const modal = new Modal(
      `🏁 The winner: ${winner.name}! ID: ${winner.id}, Time: ${timeInSec}s`,
    );

    setTimeout(() => modal.open(), 1000);
    await Winners.saveWinner({ id: winner.id, time: +timeInSec });
  }
}
