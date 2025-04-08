import { errorNotification } from '../..';
import { Api } from '../../api/api';
import { EngineStatus } from '../../types';

export class AnimationManager {
  private static readonly _FINISH_LINE_OFFSET = 80;

  private _distance = 0;
  private _engineStatus = EngineStatus.Stopped;
  public duration = 0;

  public async prepareAnimation(
    id: number,
    svgContainer: HTMLElement,
    svg: SVGElement,
  ): Promise<void> {
    this.stopAnimation(id, svg);
    const { velocity } = await Api.manageCarEngine(id, EngineStatus.Started);
    this._engineStatus = EngineStatus.Started;

    const containerWidth = svgContainer.offsetWidth;
    this._distance = containerWidth - AnimationManager._FINISH_LINE_OFFSET;
    this.duration = (this._distance / velocity) * 1000;
  }

  public runAnimation(
    id: number,
    svg: SVGElement,
    onFinish?: (didFinish: boolean) => void,
  ): void {
    const startTime = performance.now();

    this.applyTransform(svg, this._distance, this.duration);

    const handleFinish = (): void => {
      svg.removeEventListener('transitionend', handleFinish);
      if (this._engineStatus === EngineStatus.Drive) {
        onFinish?.(true);
      }
    };

    svg.addEventListener('transitionend', handleFinish);

    Api.switchEngineToDriveMode(id)
      .then(() => {
        if (this._engineStatus === EngineStatus.Started) {
          this._engineStatus = EngineStatus.Drive;
        }
      })
      .catch(() => this._handleEngineFailure(id, svg, startTime, onFinish));
  }

  public async stopAnimation(id: number, svg: SVGElement): Promise<void> {
    this._engineStatus = EngineStatus.Stopped;
    svg.style.transition = '';
    svg.style.transform = 'translateX(0)';

    try {
      await Api.manageCarEngine(id, EngineStatus.Stopped);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  private applyTransform(
    svg: SVGElement,
    value: number,
    duration: number,
  ): void {
    svg.style.transition = `transform ${duration}ms linear`;
    svg.style.transform = `translateX(${value}px)`;
  }

  private async _handleEngineFailure(
    id: number,
    svg: SVGElement,
    startTime: number,
    onFinish?: (didFinish: boolean) => void,
  ): Promise<void> {
    if (this._engineStatus === EngineStatus.Stopped) return;

    const elapsedTime = performance.now() - startTime;
    const currentPosition = (elapsedTime / this.duration) * this._distance;
    const remainingTime = this.duration - elapsedTime;

    this.applyTransform(svg, currentPosition, remainingTime);

    try {
      await Api.manageCarEngine(id, EngineStatus.Stopped);
      this._engineStatus = EngineStatus.Stopped;
    } catch (error) {
      errorNotification.open(`${error}`);
    }

    onFinish?.(false);
  }
}
