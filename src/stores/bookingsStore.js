import {action, computed, observable} from 'mobx';
import axios from 'axios';

export default class bookingsStore {
    @observable bookings = [];

    constructor() {
        axios.get('https://interview-booking-api.herokuapp.com/api/bookings')
            .then(response => response.data)
            .then(this.initData);
    }

    @action.bound
    initData(data) {
        this.bookings = data;
    };

    getNights = (checkedInDate, checkedOutDate) => {
        const checkedInSplit = checkedInDate.split('-');
        const checkedOutSplit = checkedOutDate.split('-');
        const checkedIn = new Date(checkedInSplit[2], checkedInSplit[1] - 1, checkedInSplit[0]);
        const checkedOut = new Date(checkedOutSplit[2], checkedOutSplit[1] - 1, checkedOutSplit[0]);

        return this.dayCalculate(checkedIn, checkedOut);
    };

    dayCalculate(first, second) {
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    @computed get bookingList() {
        const getRoomType = roomType => {
            switch (roomType) {
                case 'SINGLE_ROOM':
                    return 'Single room';
                case 'DOUBLE_ROOM':
                    return 'Double room';
                case 'SUITE':
                    return 'Suite';
                case 'STUDIO':
                    return 'Studio';
                default:
                    return '';
            }
        };

        const getDates = (checkedInDate, checkedOutDate) => {
            return checkedInDate.replace('-', '.') + ' - ' + checkedOutDate.replace('-', '.');
        };

        return this.bookings.map(booking => {
            return {
                name: booking.firstName + ' ' + booking.lastName,
                roomType: getRoomType(booking.roomType),
                nights: this.getNights(booking.checkInDate, booking.checkOutDate) + ' nights',
                dates: getDates(booking.checkInDate, booking.checkOutDate),
            };
        });
    }

    @computed get bestEmployees() {
        let employees = [];

        const getTotalHoursSold = (nights, employee) => {
            const hoursSold = (nights * 24);
            return (employee && employee.totalHoursSold) ? employee.totalHoursSold + hoursSold : hoursSold;
        };

        this.bookings.map(booking => {
            const employee = booking.employee;
            if (employee) {
                employees[employee.id] = {
                    name: employee.firstName + ' ' + employee.lastName,
                    profileImageUrl: employee.profileImageUrl,
                    totalHoursSold: getTotalHoursSold(this.getNights(booking.checkInDate, booking.checkOutDate), employees[employee.id]),
                };
            }
        });

        return employees.sort((a, b) => b.totalHoursSold - a.totalHoursSold).slice(0, 3);
    }
}
