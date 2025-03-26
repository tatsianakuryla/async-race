import { BASE_URL, Car, CarWithId, getCarsResponse } from './api-types';

export class GarageApi {
  public static async getCars(page = 1, limit = 7): Promise<getCarsResponse> {
    const response = await fetch(
      `${BASE_URL}/garage?_page=${page}&_limit=${limit}`,
      {
        method: 'GET',
      },
    );

    if (!response.ok) {
      //TODO open Error Modal
    }

    const cars = await response.json();
    const totalCount = Number(response.headers.get('X-Total-Count')) || 0;

    return { cars, totalCount };
  }

  public static async getCar(id: number): Promise<CarWithId> {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      //TODO open Error Modal
    }

    return await response.json();
  }

  public static async createCar(car: Car): Promise<CarWithId> {
    const response = await fetch(`${BASE_URL}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      //TODO
    }

    return await response.json();
  }

  public static async deleteCar(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      //TODO open Error Modal
    }
  }

  public static async updateCar(car: CarWithId): Promise<CarWithId> {
    const response = await fetch(`${BASE_URL}/garage/${car.id}`, {
      method: 'PUT',
      body: JSON.stringify(car),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      //TODO open Error Modal
    }

    return await response.json();
  }
}
