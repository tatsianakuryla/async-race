import { Api } from './api/api';
import type { Car, Winner } from './types';
import { HeaderFactory } from './components/ui/layout/Header';
import { MainFactory } from './components/ui/layout/Main';
import { GarageView } from './components/views/Garage-view';
import { WinnersView } from './components/views/Winners-view';
import { GarageItems } from './components/garage/Garage-items';
import './styles/style.css';
import { CarForm } from './components/ui/car-form/Car-form';

export const carForm = new CarForm();
export const garageApi = new Api<Car>('garage');
export const winnersApi = new Api<Winner>('winners');

export const main = MainFactory.get();

export const garageView = new GarageView();
export const garageViewSection = garageView.section;

export const winnersView = new WinnersView();
export const winnersViewSection = winnersView.section;

export const garageItems = new GarageItems();

document.body.append(HeaderFactory.get(), main);
garageView.open();
