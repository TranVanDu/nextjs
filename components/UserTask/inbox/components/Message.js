import React from 'react';
import { Avatar } from 'antd';
import './message.css';
import { convertTimezone } from '../../../../helpers/helpers'

export const Message = (props) => {
    const {
        data,
        isMine,
        startsSequence,
        endsSequence,
        showTimestamp,
        avatar,
        full_name,
        middle
    } = props;

    const friendlyTimestamp = convertTimezone(data.date, "MMMM Do YYYY, h:mm a");
    return (
        <div className={[
            'message',
            `${isMine ? 'mine' : ''}`,
            `${startsSequence ? 'start' : ''}`,
            `${endsSequence ? 'end' : ''}`
        ].join(' ')}>
            {
                showTimestamp &&
                <div className="timestamp">
                    {friendlyTimestamp}
                </div>
            }
            {
                middle ?
                    <div className="middle-user-message"></div>
                    : null
            }
            <div className="bubble-container">
                {isMine ?
                    <React.Fragment>
                        <div className="bubble" style={{ marginRight: "5px" }} title={friendlyTimestamp}>
                            {data.message}
                        </div>
                        {endsSequence ?
                            <div className="avt-message-auth" title={full_name}>
                                {avatar !== null ? <Avatar alt="user profile" src={avatar} className="avatar-chat rounded-circle ml-15 " >{full_name}</Avatar> :
                                    <Avatar style={{ backgroundColor: '#87d068' }}>{full_name}</Avatar>}

                            </div>
                            : <div className="div-avt-message-auth" ></div>}
                    </React.Fragment>
                    :
                    <React.Fragment>
                        {endsSequence ?
                            <div className="div-avt-message-auth" title={full_name}>
                                {avatar !== null ? <Avatar alt="user profile" src={avatar} className="avatar-chat rounded-circle ml-15 " >{full_name}</Avatar> :
                                    <Avatar style={{ backgroundColor: '#87d068' }}>{full_name}</Avatar>}
                            </div>
                            : <div className="div-avt-message-auth" ></div>}
                        <div className="bubble" title={friendlyTimestamp}>
                            {data.message}
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    );
}