import { Api } from './api/api';
import type { Car, Winner } from './types';
import { HeaderFactory } from './components/ui/layout/Header';
import { MainFactory } from './components/ui/layout/Main';
import { GarageView } from './components/views/Garage-view';
import { WinnersView } from './components/views/Winners-view';
import { Garage } from './components/garage/Garage';
import './styles/style.css';
import { CarTransform } from './components/ui/car-transform/Car-transform';

export const carTransform = new CarTransform();
export const garageApi = new Api<Car>('garage');
export const winnersApi = new Api<Winner>('winners');

export const main = MainFactory.get();

export const garageView = new GarageView();
export const garageViewSection = garageView.section;

export const winnersView = new WinnersView();
export const winnersViewSection = winnersView.section;

export const garage = new Garage();

document.body.append(HeaderFactory.get(), main);
garageView.open();
