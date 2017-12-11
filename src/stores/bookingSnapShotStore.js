import {action, observable} from 'mobx';
import axios from 'axios';

export default class bookingSnapShotStore {
    @observable availableRooms;
    @observable reservedRooms;
    @observable checkedIn;
    @observable weekAvailabilityPercent;

    constructor() {
        axios.get('https://interview-booking-api.herokuapp.com/api/booking-snapshot')
            .then(response => response.data)
            .then(this.initData);
    }

    @action.bound
    initData({availableRooms, reservedRooms, checkedIn, weekAvailabilityPercent}) {
        this.availableRooms = availableRooms;
        this.reservedRooms = reservedRooms;
        this.checkedIn = checkedIn;
        this.weekAvailabilityPercent = weekAvailabilityPercent;
    };
}
