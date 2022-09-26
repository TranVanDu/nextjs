import React from 'react';
import config from '../../../../config';
const { URL_ASSET } = config;

class AvatarConversation extends React.Component {

    render() {
        var { data } = this.props;
        return (
            <img src={`${URL_ASSET}${data}`} className="avatar-chat rounded-circle" alt="user profile" width="50" height="50" />
        )
    }
}

export default AvatarConversation;

