import { Api } from './api/api';
import { Car, Winner } from './api/api-types';
import { Garage } from './components/garage/Garage';
import { HeaderFactory } from './components/ui/layout/Header';
import { MainFactory } from './components/ui/layout/Main';
import { GarageView } from './components/views/Garage-view';
import { WinnersView } from './components/views/Winners-view';

export const garageApi = new Api<Car>('garage');
export const winnersApi = new Api<Winner>('winners');

export const garage = new Garage();

export const main = MainFactory.get();

export const garageView = new GarageView();
export const garageViewSection = garageView.section;

export const winnersView = new WinnersView();
export const winnersViewSection = winnersView.section;

document.body.append(HeaderFactory.get(), main);
garageView.open();
