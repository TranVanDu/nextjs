import React, { Component } from 'react';
import Booking from './Booking';
import Review from './Review';
import Setting from './Setting';
import ChangePassword from './ChangePassword';
import Wishlist from './Wishlist';
import Inbox from './Inbox';
import Conversation from './Conversation';
import Invite from './Invite';
import Notification from './Notification';


function UserTask(props) {

    const { task, activeTab } = props;
    switch (task) {
        case "bookings": {
            return (
                <Booking activeTab={activeTab}></Booking>
            )
        }
        case "reviews": {
            return (
                <Review></Review>
            )
        }
        case "setting": {
            return (
                <Setting ></Setting>
            )
        }
        case "changepassword": {
            return (
                <ChangePassword></ChangePassword>
            )
        }
        case "wishlist": {
            return (
                <Wishlist></Wishlist>
            )
        }
        case "inbox": {
            return (
                <Inbox></Inbox>
            )
        }
        case "conversation": {
            return (
                <Conversation></Conversation>
            )
        }
        case "invite": {
            return (
                <Invite />
            )
        }
        case "notification": {
            return (
                <Notification />
            )
        }
        default: return (
            <React.Fragment></React.Fragment>
        )

    }
}
export default UserTask;