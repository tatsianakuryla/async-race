import { errorNotification } from '../..';
import { Api } from '../../api/api';
import type { EngineStatus } from '../../types';

export class AnimationManager {
  public distance = 0;
  public duration = 0;
  public engineStatus: EngineStatus = 'stopped';

  public async prepareForStart(
    id: number,
    svgContainer: HTMLElement,
    svg: SVGElement,
  ): Promise<void> {
    this.stopAnimation(id, svg);
    const { velocity } = await Api.manageCarEngine(id, 'started');
    this.engineStatus = 'started';

    const containerWidth = svgContainer.offsetWidth;
    const finishLineOffset = 80;
    this.distance = containerWidth - finishLineOffset;
    this.duration = (this.distance / velocity) * 1000;
  }

  public runAnimation(
    id: number,
    svg: SVGElement,
    onFinish?: (didFinish: boolean) => void,
  ): void {
    const startTime = performance.now();

    svg.style.transition = `transform ${this.duration}ms linear`;

    const handleFinish = (): void => {
      svg.removeEventListener('transitionend', handleFinish);
      if (this.engineStatus === 'drive') {
        onFinish?.(true);
      }
    };

    svg.addEventListener('transitionend', handleFinish);

    requestAnimationFrame(() => {
      svg.style.transform = `translateX(${this.distance}px)`;
    });

    Api.switchEngineToDriveMode(id)
      .then(() => {
        if (this.engineStatus === 'started') {
          this.engineStatus = 'drive';
        }
      })
      .catch(async () => {
        if (this.engineStatus !== 'stopped') {
          const elapsedTime = performance.now() - startTime;
          const currentPosition = (elapsedTime / this.duration) * this.distance;
          const remainingTime = this.duration - elapsedTime;

          svg.style.transition = `transform ${remainingTime}ms linear`;
          requestAnimationFrame(() => {
            svg.style.transform = `translateX(${currentPosition}px)`;
          });

          try {
            await Api.manageCarEngine(id, 'stopped');
            this.engineStatus = 'stopped';
          } catch (error) {
            errorNotification.open(`${error}`);
          }

          onFinish?.(false);
        }
      });
  }

  public async stopAnimation(id: number, svg: SVGElement): Promise<void> {
    this.engineStatus = 'stopped';
    svg.style.transition = '';
    svg.style.transform = 'translateX(0)';

    try {
      await Api.manageCarEngine(id, 'stopped');
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
