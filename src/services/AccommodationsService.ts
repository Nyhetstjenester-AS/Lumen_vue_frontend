import {Accommodation} from '../interfaces/Accommodation';
import AccommodationsDictionary from '../dictionary_services/AccommodationsDictionary';

class AccommodationsService {
  static GetAll() {
    const result: Promise<Accommodation[]> = new Promise((resolve, reject) => {

    });
    return result;
  }
  static GetListsData() {
    return fetch(`${process.env.PUBLIC_API_URL}/api/v1/returnAccommodationsData`)
      .then(response => response.json().then(data => ({
        AccommodationValues: AccommodationsDictionary.AccommodationValues(data['Accommodation suppliers']),
        RoomTypeList: AccommodationsDictionary.RoomTypeList(data.dic_room_type),
        StatusList: AccommodationsDictionary.StatusList(data.dic_status),
      }))).catch(error => error);
  }
  static updatePrices(payload) {
    return fetch(`${process.env.PUBLIC_API_URL}/api/v1/saveAccommodationsData`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(AccommodationsDictionary.RequestPrices(payload)),
    }).then(response => response.json().then(data => ({
      ...payload,
      price: parseFloat(data.price),
      cost: parseFloat(data.cost),
    }))).catch(error => (error));
  }
}

export default AccommodationsService;
