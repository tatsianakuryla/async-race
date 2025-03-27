import { HeaderFactory } from './components/dom/start-window-factory/header-factory';
import { MainFactory } from './components/dom/start-window-factory/main-factory';

export const main = MainFactory.get();

document.body.append(HeaderFactory.get(), main);
