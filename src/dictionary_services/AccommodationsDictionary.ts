class AccommodationsDictionary {
  static AccommodationValues(data) {
    const result = [];
    data.map((res) => {
      result.push({
        name: res.o_name,
        value: res.o_id,
      });
      return null;
    });
    return result;
  }

  static RoomTypeList(data) {
    const result = [];
    data.map((res) => {
      result.push({
        name: res.d_name,
        value: res.d_id,
      });
      return null;
    });
    return result;
  }

  static StatusList(data) {
    const result = [];
    data.map((res) => {
      result.push({
        name: res.d_name,
        value: res.d_id,
        color: res.d_color_code,
      });
      return null;
    });
    return result;
  }

  static RequestPrices(data) {
    return {
      acc_id: data.accommodation,
      number: data.number,
      room_type: data.roomType,
      check_in: Date.parse(data.checkinDate),
      nights: data.nights,
    };
  }
}

export default AccommodationsDictionary;

