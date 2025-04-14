export class CarSvg {
  private _svg: SVGElement;
  private _carBody: SVGElement;

  constructor(color: string) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    this._svg = document.createElementNS(SVG_NS, 'svg');
    this._carBody = document.createElementNS(SVG_NS, 'path');
    this._buildCar(SVG_NS, color);
  }

  public get svg(): SVGElement {
    return this._svg;
  }

  public updateCarBodyColor(color: string): void {
    this._carBody.setAttribute('fill', color);
  }

  private _buildCar(ns: string, color: string): void {
    this._svg.setAttribute('width', '100');
    this._svg.setAttribute('height', '45');
    this._svg.setAttribute('viewBox', '0 0 300 100');
    this._svg.classList.add('app__svg', 'flex');

    this._appendShadow(ns);
    this._appendBody(ns, color);
    this._appendGlass(ns);
    this._appendWheels(ns);
    this._appendDetails(ns);
  }

  private _appendShadow(ns: string): void {
    const el = document.createElementNS(ns, 'ellipse');
    el.setAttribute('cx', '150');
    el.setAttribute('cy', '130');
    el.setAttribute('rx', '100');
    el.setAttribute('ry', '10');
    el.setAttribute('fill', 'rgba(0,0,0,0.1)');
    this._svg.appendChild(el);
  }

  private _appendBody(ns: string, color: string): void {
    this._carBody.setAttribute(
      'd',
      'M260 100 Q250 80, 220 80 L180 80 Q175 60, 150 60 Q120 60, 110 80 L60 80 Q50 80, 40 90 Q30 100, 30 105 L30 110 L260 110 Z',
    );
    this._carBody.setAttribute('fill', color);
    this._carBody.setAttribute('stroke', '#0056b3');
    this._carBody.setAttribute('stroke-width', '2');
    this._svg.appendChild(this._carBody);
  }

  private _appendGlass(ns: string): void {
    const glass = document.createElementNS(ns, 'path');
    glass.setAttribute('d', 'M180 80 Q175 65, 150 65 Q125 65, 120 80 Z');
    glass.setAttribute('fill', '#cce6ff');
    this._svg.appendChild(glass);
  }

  private _appendWheels(ns: string): void {
    const wheel = (cx: string) => {
      const w = document.createElementNS(ns, 'circle');
      w.setAttribute('cx', cx);
      w.setAttribute('cy', '110');
      w.setAttribute('r', '15');
      w.setAttribute('fill', '#222');
      this._svg.appendChild(w);

      const hub = document.createElementNS(ns, 'circle');
      hub.setAttribute('cx', cx);
      hub.setAttribute('cy', '110');
      hub.setAttribute('r', '6');
      hub.setAttribute('fill', '#888');
      this._svg.appendChild(hub);
    };
    wheel('90');
    wheel('210');
  }

  private _appendDetails(ns: string): void {
    const light = document.createElementNS(ns, 'ellipse');
    light.setAttribute('cx', '35');
    light.setAttribute('cy', '92');
    light.setAttribute('rx', '4');
    light.setAttribute('ry', '2');
    light.setAttribute('fill', '#ffcc00');
    this._svg.appendChild(light);

    const detail = document.createElementNS(ns, 'rect');
    detail.setAttribute('x', '40');
    detail.setAttribute('y', '70');
    detail.setAttribute('width', '10');
    detail.setAttribute('height', '15');
    detail.setAttribute('fill', '#0056b3');
    detail.setAttribute('rx', '2');
    this._svg.appendChild(detail);
  }
}
