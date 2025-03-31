export class Router {
  private static routes: Record<string, () => void> = {};

  public static init(): void {
    window.addEventListener('hashchange', () => this.handleRoute());
    document.addEventListener('DOMContentLoaded', () => this.handleRoute());
    this.handleRoute();
  }

  public static addRoute(path: string, handler: () => void): void {
    this.routes[path] = handler;
  }

  public static navigateTo(path: string): void {
    if (location.hash !== `#${path}`) {
      location.hash = path;
    }
  }

  private static handleRoute(): void {
    const path = location.hash.slice(1) || '/';

    if (this.routes[path]) {
      this.routes[path]();
    }
  }
}
