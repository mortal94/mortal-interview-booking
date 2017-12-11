import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from "react";
import styles from './App.module.scss';
import Navbar from './navbar/Navbar';
import BookingSnapShot from "./bookingSnapShot/BookingSnapShot";
import WeekInformation from "./weekInformation/WeekInformation";
import RecentActivities from "./recentActivities/RecentActivities";
import EmployeesStats from './employeesStats/EmployeesStats';

export default class App extends Component {
    render() {
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <Navbar/>
                    <div className="container">
                        <div className="col col-lg-9">
                            <BookingSnapShot/>
                            <WeekInformation/>
                        </div>
                        <div className="col col-lg-3">
                            <RecentActivities/>
                            <EmployeesStats/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
