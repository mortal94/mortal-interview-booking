import BookingSnapShotStore from './bookingSnapShotStore';
import BookingsStore from './bookingsStore';
import RecentActivitiesStore from './recentActivitiesStore';

const stores = () => {
    const bookingSnapShotStore = new BookingSnapShotStore();
    const bookingsStore = new BookingsStore();
    const recentActivitiesStore = new RecentActivitiesStore();

    return {
        bookingSnapShotStore,
        bookingsStore,
        recentActivitiesStore,
    };
};

export default stores();
