import React from 'react';
import styles from './WeekInformation.module.scss';
import {inject, observer} from "mobx-react";

const WeekInformation = inject('bookingsStore')(observer(({bookingsStore}) => {
    let bookingsList = bookingsStore.bookingList;
    const bookings = bookingsList.map(booking => <Booking booking={booking}/>);

    return (
        <div className={styles.weekInformation}>
            <div className="row week-information">
                <div className="col-lg-9 arrived-list">
                    <div className="booking-title">
                        Arrived this week
                    </div>
                    <div className="booking-row-container">
                        {bookings}
                    </div>
                </div>
                <WeekAvailability/>
            </div>
        </div>
    )
}));

const Booking = (props) => {
    const booking = props.booking;

    return (
        <div className="row booking-row">
            <div className="col-sm-3">
                <div className="row">
                    <div className="col-sm-1">
                        <div className="circle"/>
                    </div>
                    <div className="col-sm11">{booking.name}</div>
                </div>
            </div>
            <div className="col-sm-3">{booking.roomType}</div>
            <div className="col-sm-2">{booking.nights}</div>
            <div className="col-sm-4">{booking.dates}</div>
        </div>
    )
};

const WeekAvailability = inject('bookingSnapShotStore')(observer(({bookingSnapShotStore}) => {
    const percent = bookingSnapShotStore.weekAvailabilityPercent;

    const getPercentageColor = () => {
        return percent >= 86 ?
            'percentage-green' :
            percent >= 41 ?
                'percentage-yellow' :
                'percentage-red';
    };

    return (
        <div className="col-lg-3 week-availability">
            <div className="booking-title">
                Week availability
            </div>
            <div
                className={"availability-percentage " + getPercentageColor()}>
                <div>{bookingSnapShotStore.weekAvailabilityPercent + '%'}</div>
            </div>
        </div>
    )
}));

export default WeekInformation;
