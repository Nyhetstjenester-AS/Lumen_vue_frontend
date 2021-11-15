import { Accommodation } from '../interfaces/Accommodation';
import AccommodationsDictionary from '../dictionary_services/AccommodationsDictionary';

class AccommodationsService {
  static GetAll() {
    const result: Promise<Accommodation[]> = new Promise((resolve, reject) => {

    });
    return result;
  }
  static GetListsData() {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.PUBLIC_API_URL}/api/v1/returnAccommodationsData`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      })
        .then(response => response.json().then((data) => {
          resolve({
            AccommodationValues: AccommodationsDictionary.AccommodationValues(data['Accommodation suppliers']),
            RoomTypeList: AccommodationsDictionary.RoomTypeList(data.dic_room_type),
            StatusList: AccommodationsDictionary.StatusList(data.dic_status),
          });
        })).catch((error) => {
          reject(error);
        });
    });
  }
  static updatePrices(payload) {
    const result: Promise<Accommodation> = new Promise((resolve, reject) => {
      fetch(`${process.env.PUBLIC_API_URL}/api/v1/saveAccommodationsData`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(AccommodationsDictionary.RequestPrices(payload)),
      }).then(response => response.json().then((data) => {
        resolve({
          ...payload,
          price: parseFloat(data.price),
          cost: parseFloat(data.cost),
        });
      })).catch(error => reject(error));
    });
    return result;
  }
}

export default AccommodationsService;
