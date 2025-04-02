import { Api } from '../../api/api';
import { EngineStatus } from '../../types';

export class AnimationManager {
  public distance: number = 0;
  public duration: number = 0;
  public engineStatus: EngineStatus = 'stopped';

  public async stopAnimation(id: number, svg: SVGElement): Promise<void> {
    svg.style.transition = '';
    svg.style.transform = 'translateX(0)';
    try {
      await Api.manageCarEngine(id, 'stopped');
      this.engineStatus = 'stopped';
    } catch (error) {
      console.error(error);
    }
  }

  public async startAnimation(
    id: number,
    svgContainer: HTMLElement,
    svg: SVGElement,
  ): Promise<void> {
    const containerWidth = svgContainer.offsetWidth;
    const finishLineOffset = 80;
    this.distance = containerWidth - finishLineOffset;

    try {
      const { velocity } = await Api.manageCarEngine(id, 'started');
      this.engineStatus = 'started';

      this.duration = (this.distance / velocity) * 1000;
      const startTime = performance.now();

      svg.style.transition = `transform ${this.duration}ms linear`;
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
            const currentPosition =
              (elapsedTime / this.duration) * this.distance;
            const remainingTime = this.duration - elapsedTime;
            svg.style.transition = `transform ${remainingTime}ms linear`;
            requestAnimationFrame(() => {
              svg.style.transform = `translateX(${currentPosition}px)`;
            });

            try {
              await Api.manageCarEngine(id, 'stopped');
              this.engineStatus = 'stopped';
            } catch (error) {
              console.error(error);
            }
          }
        });
    } catch (error) {
      throw new Error(`Failed to startAnimation: ${error}`);
    }
  }
}
