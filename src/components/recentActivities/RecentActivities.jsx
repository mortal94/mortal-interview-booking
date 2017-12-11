import React from 'react';
import styles from './RecentActivities.module.scss';
import {inject, observer} from "mobx-react";

const RecentActivities = inject('recentActivitiesStore')(observer(({recentActivitiesStore}) => {
    const activities = recentActivitiesStore.activitiesList.map(activity => <Activity activity={activity}/>);

    return (
        <div className={styles.recentActivities}>
            <div className="event-container-padding">
                <div className="booking-title">
                    Recent Activities
                </div>
                {activities}
            </div>
        </div>
    )
}));

const Activity = (props) => {
    const activity = props.activity;

    const getIndicatorColor = () => {
        return activity.type === 'New employee' ?
            'system-audit-activity' :
            activity.type === 'Maintenance' ?
                'maintenance-activity' :
                'new-booking-activity';
    };

    return (
        <div className="event-container">
            <div className={"event-indicator " + getIndicatorColor()}/>
            <div className="event-padding">
                <div className="title-container">
                    <div className="activity-type">
                        {activity.type}
                    </div>
                    <div className="activity-time text-center">
                        {activity.time}
                    </div>
                </div>
                <div className="activity-description">
                    {activity.description}
                </div>
            </div>
        </div>
    )
};

export default RecentActivities;
