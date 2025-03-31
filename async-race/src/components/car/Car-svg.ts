export class CarSvg {
  private _svg: SVGElement;
  private _carBody: SVGElement;

  constructor(color: string) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    this._svg = document.createElementNS(SVG_NS, 'svg');
    this._carBody = document.createElementNS(SVG_NS, 'path');
    this._createCarSvg(SVG_NS, color);
  }

  public get svg(): SVGElement {
    return this._svg;
  }

  public updateCarBodyColor(color: string): void {
    this._carBody.setAttribute('fill', color);
  }

  private _createCarSvg(SVG_NS: string, color: string = '#007bff'): SVGElement {
    this._svg.setAttribute('width', '100');
    this._svg.setAttribute('height', '50');
    this._svg.setAttribute('viewBox', '0 0 300 150');

    // 1. Тень
    const shadow = document.createElementNS(SVG_NS, 'ellipse');
    shadow.setAttribute('cx', '150');
    shadow.setAttribute('cy', '130');
    shadow.setAttribute('rx', '100');
    shadow.setAttribute('ry', '10');
    shadow.setAttribute('fill', 'rgba(0,0,0,0.1)');
    this._svg.appendChild(shadow);

    // 2. Корпус
    this._carBody.setAttribute(
      'd',
      'M260 100 Q250 80, 220 80 L180 80 Q175 60, 150 60 Q120 60, 110 80 L60 80 Q50 80, 40 90 Q30 100, 30 105 L30 110 L260 110 Z',
    );
    this._carBody.setAttribute('fill', color);
    this._carBody.setAttribute('stroke', '#0056b3');
    this._carBody.setAttribute('stroke-width', '2');
    this._svg.appendChild(this._carBody);

    // 3. Лобовое стекло
    const glass = document.createElementNS(SVG_NS, 'path');
    glass.setAttribute('d', 'M180 80 Q175 65, 150 65 Q125 65, 120 80 Z');
    glass.setAttribute('fill', '#cce6ff');
    this._svg.appendChild(glass);

    // 4. Колёса (тёмная часть)
    const wheelBack = document.createElementNS(SVG_NS, 'circle');
    wheelBack.setAttribute('cx', '90');
    wheelBack.setAttribute('cy', '110');
    wheelBack.setAttribute('r', '15');
    wheelBack.setAttribute('fill', '#222');
    this._svg.appendChild(wheelBack);

    const wheelFront = document.createElementNS(SVG_NS, 'circle');
    wheelFront.setAttribute('cx', '210');
    wheelFront.setAttribute('cy', '110');
    wheelFront.setAttribute('r', '15');
    wheelFront.setAttribute('fill', '#222');
    this._svg.appendChild(wheelFront);

    // 5. Диски (светлая часть)
    const hubBack = document.createElementNS(SVG_NS, 'circle');
    hubBack.setAttribute('cx', '90');
    hubBack.setAttribute('cy', '110');
    hubBack.setAttribute('r', '6');
    hubBack.setAttribute('fill', '#888');
    this._svg.appendChild(hubBack);

    const hubFront = document.createElementNS(SVG_NS, 'circle');
    hubFront.setAttribute('cx', '210');
    hubFront.setAttribute('cy', '110');
    hubFront.setAttribute('r', '6');
    hubFront.setAttribute('fill', '#888');
    this._svg.appendChild(hubFront);

    // 6. Фара
    const light = document.createElementNS(SVG_NS, 'ellipse');
    light.setAttribute('cx', '35');
    light.setAttribute('cy', '92');
    light.setAttribute('rx', '4');
    light.setAttribute('ry', '2');
    light.setAttribute('fill', '#ffcc00');
    this._svg.appendChild(light);

    // 7. Зеркало / дверь
    const detail = document.createElementNS(SVG_NS, 'rect');
    detail.setAttribute('x', '40');
    detail.setAttribute('y', '70');
    detail.setAttribute('width', '10');
    detail.setAttribute('height', '15');
    detail.setAttribute('fill', '#0056b3');
    detail.setAttribute('rx', '2');
    this._svg.appendChild(detail);

    return this._svg;
  }
}
