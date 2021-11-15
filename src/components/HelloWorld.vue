<template>
  <div id="app" class="container">
    <form>
      <h1>Hotel</h1>
      <div class="container">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Accommodation</th>
            <th scope="col">Number of rooms</th>
            <th class="col-2">Room type</th>
            <th scope="col">Check-in date</th>
            <th scope="col">NTS</th>
            <th scope="col">Price</th>
            <th scope="col">Cost</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(accommodation, index) in Accommodations" :key="index">
            <td class="align-middle">
              <color-selector class="my-dropdown-toggle"
                              :options="StatusList"
                              v-bind:selected="accommodation.status"
                              v-on:updateOption="accommodation.status = $event"
                              :closeOnOutsideClick="true"
              ></color-selector>
            </td>
            <td>
              <select class="form-select form-control"
                      v-on:blur="updatePrices(index)"
                      v-model="accommodation.accommodation">
                <option v-for="acc in AccommodationValues"
                        v-bind:value="acc.value"
                        :key="acc.value">
                  {{ acc.name }}
                </option>
              </select>
            </td>
            <td>
              <input
                v-model="accommodation.number" :name="`Accommodations[${index}][number]`"
                type="text"
                class="form-control"
                v-on:blur="updatePrices(index)"
                placeholder="0">
            </td>
            <td>
              <select class="form-select form-control"
                      v-on:blur="updatePrices(index)"
                      v-model="accommodation.roomType">
                <option v-for="roomType in RoomTypeList"
                        v-bind:value="roomType.value"
                        :key="roomType.value">
                  {{ roomType.name }}
                </option>
              </select>
            </td>
            <td>
              <date-picker
                prefix-class="xmx"
                v-model="accommodation.checkinDate"
                valueType="format"
              ></date-picker>
            </td>
            <td><input
              v-model="accommodation.nights" :name="`Accommodations[${index}][nights]`"
              v-on:blur="updatePrices(index)"
              type="text"
              class="form-control"
              placeholder="0"></td>
            <td><input
              v-model="accommodation.price" :name="`Accommodations[${index}][price]`"
              type="text"
              class="form-control"
              placeholder="0"
              disabled
            ></td>
            <td><input
              v-model="accommodation.cost" :name="`Accommodations[${index}][cost]`"
              type="text"
              class="form-control"
              placeholder="0"
              disabled
            ></td>
            <td class="align-middle">
              <button
                name="delete"
                type="button"
                @click="deleteAccommodation(index)"
                class="btn btn-primary">X
              </button>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td scope="col">
              <div class="form-group">
                <button @click="addLine"
                        type="button"
                        class="btn btn-secondary">Add
                </button>
              </div>
            </td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td class="col-2"></td>
            <td scope="col"></td>
            <td scope="col"></td>
            <td scope="col">TOTAL: {{ total }}</td>
            <td scope="col"></td>
            <td scope="col"></td>
          </tr>

          </tfoot>
        </table>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import DatePicker from 'vue2-datepicker';
import AccommodationsService from '../services/AccommodationsService.ts';
import './datepicker.scss';
import ColorSelector from './color-selector/ColorSelector';

export default {
  name: 'App',
  components: { DatePicker, ColorSelector },
  data() {
    return {
      total: 0,
      Accommodations: [
      ],
      AccommodationValues: [
        {
          name: '',
          value: '',
        },
      ],
      RoomTypeList: [
        {
          name: '',
          value: '',
        },
      ],
      StatusList: [],
    };
  },

  created() {
    AccommodationsService.GetListsData().then((res) => {
      this.initDropdownsData(res);
    });
  },

  methods: {
    addLine() {
      this.Accommodations.push({
        status: this.StatusList[0],
        accommodation: '',
        number: 0,
        roomType: '',
        checkinDate: '',
        nights: 0,
        price: 0,
        cost: 0,
      });
    },
    initAccommodations(res) {
      this.Accommodations = res;
    },
    calculateTotalCost() {
      this.total = this.Accommodations
        .reduce((acc, value) => (((100 * value.cost) + (acc * 100)) / 100), 0);
    },
    initDropdownsData(res) {
      this.AccommodationValues = res.AccommodationValues;
      this.RoomTypeList = res.RoomTypeList;
      this.StatusList = res.StatusList;
    },
    updatePrices(payload) {
      const data = this.Accommodations[payload];
      if (data.checkinDate !== ''
        && data.nights !== 0
        && data.roomType !== ''
        && data.accommodation !== ''
        && data.number !== 0) {
        AccommodationsService.updatePrices(this.Accommodations[payload]).then((result) => {
          this.Accommodations[payload].price = result.price;
          this.Accommodations[payload].cost = result.cost;
        }).then(() => this.calculateTotalCost());
      }
    },
    deleteAccommodation(key) {
      this.Accommodations.splice(key, 1);
      this.calculateTotalCost();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
input .btn, .btn-primary {
  border-radius: 50%;
  width: 23px;
  height: 23px;
  line-height: 0.2rem;
  font-size: 11px;
  padding: 0;
}
</style>
