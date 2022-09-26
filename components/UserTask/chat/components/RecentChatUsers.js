/**
 * Recent Chat Users
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Layout } from 'antd';
import Router from 'next/router';
import { chatWithSelectedUser } from '../../../../redux/actions/InboxAction';



// components
import UserListItem from './UserListItem';

const { Content } = Layout;


class RecentChatUsers extends Component {

    static defaultProps = {
        data: []
    }

    /**
     * Swicth Chat With User
     * @param {*object} user
     */
    switchChatWithUser(user) {
        this.props.chatWithSelectedUser(user);
        Router.push({ pathname: '/user/[task]', query: { task: "conversation", conversation_id: user.id } }, `/user/conversation?conversation_id=${user.id}`)
    }

    render() {
        const { selectedUser, data, authUser } = this.props;
        return (
            <Content>
                {data.map((user) => (
                    <UserListItem
                        user={user}
                        key={user.id}
                        authId={authUser.id}
                        onClickListItem={() => this.switchChatWithUser(user)}
                    />
                ))}
            </Content>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedUser: state.chatAppReducer.selectedUser,
        authUser: state.auth.user,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        chatWithSelectedUser: (user) => dispatch(chatWithSelectedUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentChatUsers);
