import React from 'react';
import styles from './EmployeesStats.module.scss';

import {inject, observer} from "mobx-react";

const EmployeesStats = inject('bookingsStore')(observer(({bookingsStore}) => {
    const bestEmployees = bookingsStore.bestEmployees.map(employee => <Employee employee={employee}/>);

    return (
        <div className={styles.employeesStats}>
            <div className="employee-stats-title">
                Employee stats
            </div>
            {bestEmployees}
        </div>
    )
}));

const Employee = (props) => {
    const employee = props.employee;

    return (
        <div className="employee-container">
            <div className="employee-image">
                <img src={employee.profileImageUrl} height="33" width="33"/>
            </div>
            <div className="employee-stats-container">
                <div className="employee-stats">
                    <div className="employee-name">{employee.name}</div>
                    <div className="employee-hours">{employee.totalHoursSold + ' hours'}</div>
                </div>
                <div className="progress custom-progressbar">
                    <div className="progress-bar bg-success custom-progressbar-inner" role="progressbar"
                         style={{width: (employee.totalHoursSold / 10) + '%'}}
                         aria-valuenow={employee.totalHoursSold}
                         aria-valuemin="0"
                         aria-valuemax="1000"/>
                </div>
            </div>
        </div>
    )
};

export default EmployeesStats;
