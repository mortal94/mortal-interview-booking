import {action, computed, observable} from 'mobx';
import axios from 'axios';

export default class RecentActivitiesStore {
    @observable activities = [];

    constructor() {
        const updateActivities = () => {
            axios.get('https://interview-booking-api.herokuapp.com/api/recent-activity')
                .then(response => response.data)
                .then(this.initData);
        };

        updateActivities();
        setInterval(updateActivities, 10000);
    }

    @action.bound
    initData(activities) {
        this.activities = activities;
    };

    @computed get activitiesList() {
        function getActivityType(activityType) {
            switch (activityType) {
                case 'NEW_EMPLOYEE':
                    return 'New employee';
                case 'MAINTENANCE':
                    return 'Maintenance';
                case 'CHECK_IN':
                    return 'Check in';
                default:
                    return '';
            }
        }

        const getActivityTime = occurredTime => {
            const occurredDate = new Date(occurredTime);
            const currentDate = new Date();

            return Math.round((currentDate.getTime() - occurredDate.getTime()) / (1000)) + 'min.';
        };

        return this.activities.map(activity => {
            return {
                type: getActivityType(activity.activityType),
                description: activity.description,
                time: getActivityTime(activity.occurredAt),
            }
        })
    }
}
