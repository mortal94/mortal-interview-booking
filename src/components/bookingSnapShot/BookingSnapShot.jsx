import React from 'react';
import {inject, observer} from "mobx-react";
import styles from './BookingSnapShot.module.scss';

const BookingSnapShot = inject('bookingSnapShotStore')(observer(({bookingSnapShotStore}) => {
    return (
        <div className={styles.bookingSnapShot}>
            <div className="hotel-general-information row">
                <HotelGeneralInfo value={bookingSnapShotStore.availableRooms} description="Rooms available"/>
                <HotelGeneralInfo value={bookingSnapShotStore.reservedRooms} description="Reserved rooms"/>
                <HotelGeneralInfo value={bookingSnapShotStore.checkedIn} description="Checked in"/>
            </div>
        </div>
    )
}));

const HotelGeneralInfo = (props) => {
    return (
        <div className="col-lg-4">
            <div className="value">
                {props.value}
            </div>
            <div className="description">
                {props.description}
            </div>
        </div>
    )
};

export default BookingSnapShot
