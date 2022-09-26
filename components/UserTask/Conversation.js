/**
 * Chat Area Component
 */
import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Row, Col, Layout, Button } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import config from '../../config';
import Router from 'next/router';
import { withRouter } from 'next/router'
// actions
import { getAllMessageChat, setRead, sendMessageToUser, getConversationDetail, getUserConversationChat } from '../../redux/actions/InboxAction';

import AvatarConversation from './chat/components/AvataConversation';
import Message from './chat/components/Message';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { messageError } from '../NotificationElement/Message';

const { URL_ASSET } = config;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Content } = Layout;


class Conversation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            allMessagesChat: {
                list: [],
                paging: {
                    count: 0,
                    totalpage: 1,
                    perpage: 20,
                    page: 1
                },
                attend: false
            },
            filter: {
                paging: {
                    perpage: 20,
                    page: 1
                }
            },
            loadingPage: false,
            loadingMessage: false,
            firstLoading: true,
        };
        this.chatScroll = React.createRef();
    }

    componentDidMount() {
        var { conversation_id } = Router.query;
        var { authUser } = this.props;
        var cid = ""
        if (authUser) {
            cid = authUser.id;
        }
        if (conversation_id) {
            this.props.getConversationDetail(conversation_id, cid);
            let a = this;
            this.props.getAllMessageChat(conversation_id, this.state.filter).then(res => {
                this.setState({
                    ...this.state,
                    allMessagesChat: res.data,
                    firstLoading: false
                }, () => {
                    if (a.chatScroll.current) a.chatScroll.current.scrollToBottom();
                })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        var { conversation_id } = this.props.router.query;
        var { authUser } = this.props;
        var cid = ""
        if (authUser) {
            cid = authUser.id;
        }
        if (conversation_id && prevProps.router.query.conversation_id != conversation_id) {
            let a = this;
            this.setState({
                ...this.state,
                message: "",
                loadingPage: true,
                firstLoading: true,
                filter: {
                    paging: {
                        perpage: 20,
                        page: 1
                    }
                }
            }, () => {
                this.props.getConversationDetail(conversation_id, cid);
                a.props.getAllMessageChat(conversation_id, a.state.filter).then(res => {
                    a.setState({
                        ...a.state,
                        allMessagesChat: res.data,
                        loadingPage: false,
                        firstLoading: false
                    }, () => {
                        if (a.chatScroll.current) a.chatScroll.current.scrollToBottom();
                    })
                })
                    .catch(err => {
                        a.setState({
                            ...a.state,
                            loadingPage: false
                        })
                    })
            })

        }

        if (this.props.newMessage && this.props.newMessage != prevProps.newMessage) {
            let newM = this.props.newMessage;
            if (this.props.currentConversation) {
                if (newM.cid != this.props.authUser.id) {
                    if (newM.conversation_id == this.props.currentConversation.id) {

                        let newListM = [...this.state.allMessagesChat.list];
                        newListM.unshift(newM);
                        let a = this;
                        this.setState({
                            ...this.state,
                            allMessagesChat: {
                                ...this.state.allMessagesChat,
                                list: newListM
                            },
                        }, () => { if (a.chatScroll.current) a.chatScroll.current.scrollToBottom() })

                    }
                }
            }

        }

    }


    onSubmitMessage = (event) => {
        event.preventDefault();
        let a = this;
        if (this.state.message.trim() !== '') {
            if (!this.state.loadingMessage) {
                this.setState({
                    ...this.state,
                    loadingMessage: true
                })
                let { currentConversation, authUser } = this.props;
                let toArr = [];
                if (currentConversation.partner) {
                    let partner = currentConversation.partner
                    if (currentConversation.partner.length) {
                        for (let i = 0; i < partner.length; i++) {
                            if (partner[i].partner_id != authUser.id) {
                                let id = partner[i].partner_id
                                toArr.push(id)
                            }
                        }
                    }
                }
                if (toArr.length == 0) toArr = [0];
                let cplData = {
                    id: new Date().getTime(),
                    content: this.state.message.trim(),
                    conversation_id: currentConversation.id,
                    cid: authUser.id,
                    created_at: new Date().toUTCString(),
                    updated_at: new Date().toUTCString(),
                    sender_firstname: authUser.firstname,
                    sender_lastname: authUser.lastname,
                    sender_avatar: authUser.image ? authUser.image : "https://app.gopanda.asia/public/backup.png",
                    avatar_thumb: authUser.image ? URL_ASSET + authUser.image : "https://app.gopanda.asia/public/backup.png",

                };
                let data = {
                    content: this.state.message.trim(),
                    conversation_id: currentConversation.id,
                    cid: authUser.id,
                    to: toArr
                }

                let newListM = [...this.state.allMessagesChat.list];
                newListM.unshift(cplData);
                let a = this;
                this.setState({
                    ...this.state,
                    allMessagesChat: {
                        ...this.state.allMessagesChat,
                        list: newListM
                    },
                    message: "",
                    loadingMessage: false
                }, () => {
                    if (a.chatScroll.current) a.chatScroll.current.scrollToBottom();
                    a.props.sendMessageToUser(data, cplData).then(res => {

                    })
                        .catch(err => {
                            messageError("Send message error")
                            let newListM = [];
                            newListM = a.state.allMessagesChat.list.filter(item => {
                                return item.id != cplData.id
                            })
                            a.setState({
                                ...a.state,
                                allMessagesChat: {
                                    ...a.state.allMessagesChat,
                                    list: newListM
                                },
                            })
                        })
                })

            }
        }


    }

    setAvtArr() {
        let user = this.props.currentConversation;
        if (user.last_admin) {
            let admin = user.last_admin;
            if (admin.avatar) {
                return admin.avatar;
            }
        }
        return "/backup.png";
    }

    setName() {
        var name = "";
        let user = this.props.currentConversation;
        if (user.last_admin) {
            let admin = user.last_admin;
            if (admin.firstname) {
                name = admin.firstname;
            }
            if (admin.lastname) {
                name = (`${name} ${admin.lastname}`).trim()
            }
        }
        return name;
    }


    //set data message

    createDataMessage(chats) {
        let lg = chats.length;
        if (lg === 0) return [];
        else {
            let i = 0;
            let dataMessages = [];
            for (i = 0; i < lg; i++) {
                let message = {
                    id: chats[i].id,
                    author: chats[i].cid,
                    message: chats[i].content,
                    timestamp: new Date(chats[i].updated_at).getTime(),
                    avatar: chats[i].avatar_thumb ? chats[i].avatar_thumb : "https://app.gopanda.asia/public/backup.png",
                    firstname: chats[i].sender_firstname,
                    lastname: chats[i].sender_lastname,
                    date: chats[i].updated_at

                }
                dataMessages.unshift(message);
            }
            // console.log(dataMessages)
            return dataMessages;
        }
    }

    renderMessages(auth) {
        let dataMessages = this.createDataMessage(this.state.allMessagesChat.list)
        let i = 0;
        let messageCount = dataMessages.length;
        let messages = [];


        while (i < messageCount) {
            let previous = dataMessages[i - 1];
            let current = dataMessages[i];
            let next = dataMessages[i + 1];
            let isMine = current.author === auth;
            let currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;
            let middle = false;
            if (previous) {
                if (previous.author != current.author) middle = true;
            }

            if (previous) {
                let previousMoment = moment(previous.timestamp);
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.author === current.author;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = moment(next.timestamp);
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.author === current.author;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            messages.push(
                <Message
                    key={current.id}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                    avatar={current.avatar}
                    firstname={current.firstname}
                    lastname={current.lastname}
                    middle={middle}
                />
            );

            // Proceed to the next message.
            i += 1;
        }

        return messages;
    }

    onFocusInput = (e) => {
        this.setSeen()
    }

    onChangeArea = (e) => {
        this.setState({
            ...this.state,
            message: e.target.value
        })
    }

    changePage() {
        let { currentConversation } = this.props;
        let conversation_id = currentConversation ? currentConversation.id : "";
        let a = this;
        this.setState({
            ...this.state,
            filter: {
                paging: {
                    perpage: 20,
                    page: this.state.filter.paging.page + 1
                }
            },
            loadingPage: true
        }, () => {
            a.props.getAllMessageChat(conversation_id, a.state.filter).then(res => {
                let { list, paging } = res.data;
                let newList = [...a.state.allMessagesChat.list];
                newList.push(...list);
                a.setState({
                    ...a.state,
                    allMessagesChat: {
                        ...a.state.allMessagesChat,
                        list: newList,
                        paging: paging
                    },
                    loadingPage: false
                })
            }).catch(err => {
                a.setState({
                    ...a.state,
                    loadingPage: false
                })
            })
        })
    }

    onScrollSidebar = (e) => {
        if (this.state.filter.paging.page < this.state.allMessagesChat.paging.totalpage) {
            let t = this.chatScroll.current.getScrollTop();
            if (t < 100) {
                if (!this.state.loadingPage) {
                    this.changePage()
                }
            }
        }
    }



    setSeen = () => {
        let { currentConversation, authUser } = this.props;
        if (currentConversation.unread) {
            let data = {
                cid: authUser.id,
                conversation_id: currentConversation.id
            }
            this.props.setSeen(data);

        }
    }


    handleKeyDown(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            return this.onSubmitMessage(event);
        }
    }



    render() {
        var { authUser, currentConversation } = this.props;
        authUser = authUser ? authUser : {}

        if (currentConversation === null) {
            return (
                <Content>
                    <div className="db-content pdtop-20">
                        <div className="my-dashboard">

                            {/* header */}
                            <div className="chat-main-body">
                                <Scrollbars
                                    className="rct-scroll"
                                    autoHide
                                    style={{ height: 'calc(100vh - 370px)' }}
                                >
                                    <Row type="flex" justify="space-around" align="middle" style={{ height: "100%" }}>
                                        <Col className="text-center">
                                            <LoadingOutlined style={{ fontSize: "30px" }} />
                                        </Col>
                                    </Row>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Content>
            );
        }

        return (
            <Content>
                <div className="db-content pdtop-20">
                    <div className="my-inbox">

                        {/* header */}
                        <div className="chat-main-body">
                            <div className="chat-head">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="media align-items-center">
                                        <div className="mr-10">
                                            <AvatarConversation data={this.setAvtArr()}></AvatarConversation>
                                        </div>
                                        <div className="media-body ml-3">
                                            <h5 className="mb-0" style={{ textTransform: "capitalize" }} >{this.setName()}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* chat area */}

                            {this.state.firstLoading ?
                                <Scrollbars
                                    className="rct-scroll"
                                    autoHide
                                    style={{ height: 'calc(100vh - 320px)' }}
                                >
                                    <Row type="flex" justify="space-around" align="middle" style={{ height: "100%" }}>
                                        <Col className="text-center">
                                            <LoadingOutlined style={{ fontSize: "30px" }} />
                                        </Col>
                                    </Row>
                                </Scrollbars> :

                                <React.Fragment>

                                    <Scrollbars
                                        className="rct-scroll"
                                        autoHide
                                        ref={this.chatScroll}
                                        style={{ height: '75vh' }}
                                        onScroll={this.onScrollSidebar}
                                    >
                                        <div className="chat-body p-30">
                                            {this.state.loadingPage ?
                                                <div align="center"><LoadingOutlined /></div>
                                                :
                                                null}
                                            {this.renderMessages(authUser.id)}
                                        </div>
                                    </Scrollbars>

                                    {/* chat footer */}

                                    <div className="chat-footer d-flex px-4 align-items-center py-3 mb-30">
                                        <React.Fragment>
                                            <form className="mr-3 w-100" onSubmit={this.onSubmitMessage}>
                                                <textarea
                                                    className="form-control"
                                                    type="text"
                                                    id="search-msg"
                                                    placeholder="Type your message"
                                                    value={this.state.message}
                                                    style={{ height: "50px", lineHeight: "36px" }}
                                                    onChange={this.onChangeArea}
                                                    onFocus={this.onFocusInput}
                                                    autoFocus={true}
                                                    onKeyDown={this.handleKeyDown.bind(this)}
                                                />
                                            </form>
                                            <Button
                                                onClick={this.onSubmitMessage}
                                                type="primary"
                                            >
                                                Send&nbsp;<FontAwesomeIcon className="" icon={<LegacyIcon type={['fad', 'paper-plane']} />}></FontAwesomeIcon>
                                            </Button>
                                        </React.Fragment>
                                    </div>
                                </React.Fragment>
                            }
                        </div>

                    </div>
                </div>
            </Content>
        );
    }
}

function mapStateToProps(state) {
    return {
        authUser: state.auth.user,
        newMessage: state.chatAppReducer.newMessage,
        currentConversation: state.chatAppReducer.currentConversation,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllMessageChat: (id, filter) => dispatch(getAllMessageChat(id, filter)),
        setSeen: (data) => dispatch(setRead(data)),
        sendMessageToUser: (data, cplData) => dispatch(sendMessageToUser(data, cplData)),
        getConversationDetail: (id, cid) => dispatch(getConversationDetail(id, cid)),
        getUserConversationChat: (id, filter) => dispatch(getUserConversationChat(id, filter))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversation));
