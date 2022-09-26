import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Tabs, PageHeader, Button, Modal } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { LoadingOutlined, MessageOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getMessages, myBookingConversation, sendMessage, myConversation } from '../../../requests/chat'
import { Message } from './components/Message'
import ConversationInfo from './components/ConversationInfo';
import ReservationTab from './components/ReservationTab';
import ConversationTab from './components/ConversationTab';
import Responsive, { useMediaQuery } from "react-responsive";

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

const { TabPane } = Tabs;

export const ChatComponent = (props) => {
    const { t } = props;
    const [itemActive, setItemActive] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [listMessages, setListMessages] = useState([]);
    const [listBookingConversation, setListBookingConversation] = useState([]);
    // const [listConversation, setListConversation] = useState([]);
    const [firstLoading, setFirstLoading] = useState(true);
    // const [firstLoadingConversation, setFirstLoadingConversation] = useState(true);
    const [loadingMsgFirstPage, setLoadingMsgFirstPage] = useState(false);
    const [visibleCI, setVisibleCI] = useState(false)
    const [paging, setPaging] = useState({
        page: 1,
        perpage: 20,
        totalpage: 1
    })
    const authUser = useSelector(state => state.auth.user);
    const config = useSelector(state => state.config);
    const newMessage = useSelector(state => state.inbox.newMessage);
    const chatScroll = useRef(null);
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 768 });

    useEffect(() => {
        if (newMessage) {
            if (itemActive && newMessage.conversation_id == itemActive.id) {
                let newListM = [...listMessages];
                newListM.unshift(newMessage);
                setListMessages(newListM);
                chatScroll.current.scrollToBottom();
            }
        }
    }, [newMessage])

    useEffect(() => {
        myBookingConversation().then(res => {
            setListBookingConversation(res.list)
            setFirstLoading(false)
        })
        // myConversation().then(res => {
        //     setListConversation(res.list)
        //     setFirstLoadingConversation(false);
        // })
    }, []);

    useEffect(() => {
        if (itemActive) {
            setLoadingMsgFirstPage(true);
            getMessages(itemActive ? itemActive.id : null, { page: 1, perpage: 20 }).then(res => {
                setListMessages(res.list);
                setPaging(res.paging);
                setLoadingMsgFirstPage(false);
                chatScroll.current.scrollToBottom();
            });
        }
    }, [itemActive])

    const onScrollSidebar = (e) => {
        if (paging.page < paging.totalpage) {
            let t = chatScroll.current.getScrollTop();
            if (t < 100) {
                if (!loadingPage) {
                    changePage();
                }
            }
        }
    }

    let changePage = () => {
        setLoadingPage(true);
        getMessages(itemActive.id, { page: +paging.page + 1 }).then(res => {
            let { list, paging } = res;
            let newList = [...listMessages];
            newList.push(...list);
            setPaging(paging);
            setListMessages(newList);
            setLoadingPage(false);
        }).catch(err => {
        })
    }

    let onSubmitMessage = (event) => {
        event.preventDefault();
        myBookingConversation().then(res => {
            setListBookingConversation(res.list)
            // setFirstLoading(false)
        })
        if (message.trim() !== '') {
            if (!loadingMessage) {
                setLoadingMessage(true);
                let cplData = {
                    id: new Date().getTime(),
                    content: message.trim(),
                    conversation_id: itemActive.id,
                    sender: {
                        username: authUser.username,
                        firstname: authUser.firstname,
                        firstname: authUser.lastname,
                        avatar: authUser.image || '',
                    },
                    cid: authUser.id,
                    created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                    updated_at: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                };
                let data = {
                    content: message.trim(),
                }

                let newListM = [...listMessages];
                newListM.unshift(cplData);
                setListMessages(newListM);
                setLoadingMessage(false);
                setMessage('');
                sendMessage({
                    conversation_id: itemActive.id,
                    content: data.content
                }).then(res => { }).catch(err => {
                })
            }
        }
    }

    let renderMessages = () => {
        let dataMessages = createDataMessage(listMessages);
        let i = 0;
        let messageCount = dataMessages.length;
        let messages = [];
        var me = authUser;
        while (i < messageCount) {
            let previous = dataMessages[i - 1];
            let current = dataMessages[i];
            let next = dataMessages[i + 1];
            let isMine = me.id === current.author_id;
            let currentMoment = moment(current.timestamp, 'YYYY-MM-DD HH:mm:ss');
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;
            let middle = false;
            let avatar = current.avatar ? config.url_asset_root + current.avatar : config.url_asset_root + 'backup.png';
            if (previous) {
                if (previous.author != current.author) middle = true;
            }
            if (previous) {
                let previousMoment = moment(previous.timestamp, 'YYYY-MM-DD HH:mm:ss');
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.author_id === current.author_id;

                if (prevBySameAuthor && previousDuration.hours() < 1) {
                    startsSequence = false;
                }

                if (previousDuration.hours() < 1) {
                    showTimestamp = false;
                }
            }
            if (next) {
                let nextMoment = moment(next.timestamp, 'YYYY-MM-DD HH:mm:ss');
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.author_id === current.author_id;

                if (nextBySameAuthor && nextDuration.hours() < 1) {
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
                    avatar={avatar}
                    full_name={current.full_name}
                    middle={middle}
                />
            );
            // Proceed to the next message.
            i += 1;
        }
        return messages;
    }

    let createDataMessage = (chats) => {
        let lg = chats.length;
        if (lg === 0) return [];
        else {
            let i = 0;
            let dataMessages = [];
            for (i = 0; i < lg; i++) {
                let message = {
                    id: chats[i].id,
                    author: chats[i].sender ? chats[i].firstname + ' ' + chats[i].lastname : "",
                    message: chats[i].content,
                    timestamp: chats[i].created_at,
                    avatar: chats[i].sender.avatar,
                    full_name: chats[i].sender.firstname + ' ' + chats[i].sender.lastname,
                    date: chats[i].created_at,
                    author_id: chats[i].cid,

                }
                dataMessages.unshift(message);
            }
            return dataMessages;
        }
    }
    let onFocusInput = () => {

    }

    let handleKeyDown = () => {

    }

    let onChangeTabInbox = (tab) => {
        if (tab == '1') {

        }
    }

    return (
        <Row gutter={20} >
            <Col span={8} style={{ borderRight: "#ddd solid 1px" }}>
                {/* <Tabs defaultActiveKey="1" onChange={onChangeTabInbox} centered={true}>
                    <TabPane tab="Đặt chỗ" key="1">
                        <ReservationTab config={config} firstLoading={firstLoading} listBookingConversation={listBookingConversation} itemActive={itemActive} setItemActive={setItemActive} t={t} />
                    </TabPane>
                    <TabPane tab="Tin nhắn riêng" key="2">
                        <ConversationTab config={config} firstLoading={firstLoadingConversation} listBookingConversation={listConversation} itemActive={itemActive} setItemActive={setItemActive} />
                    </TabPane>
                </Tabs> */}
                <ReservationTab config={config} firstLoading={firstLoading} listBookingConversation={listBookingConversation} itemActive={itemActive} setItemActive={setItemActive} t={t} />
            </Col>
            <Col span={16}>
                {itemActive !== null && <div className="shadow-bottom">
                    <PageHeader
                        className="chat-site-page-header"
                        title={`${itemActive.partner[0].partner_firstname} ${itemActive.partner[0].partner_lastname}`}
                        subTitle={isDesktopOrLaptop ? <span className="pointer" onClick={() => setVisibleCI(true)}>Xem chi tiết</span> : <span><InfoCircleOutlined /></span>}
                    />
                </div>}

                {/* message area */}
                {itemActive !== null ? <React.Fragment>
                    {loadingMsgFirstPage ?
                        <Row align="center" className="mt-4">
                            <LoadingOutlined style={{ fontSize: '30px' }} />
                        </Row>
                        :
                        <Scrollbars
                            className="rct-scroll"
                            autoHide
                            ref={chatScroll}
                            style={{ height: 'calc(100vh - 250px)' }}
                            onScroll={onScrollSidebar}
                        >
                            <div className="chat-body p-3" style={{ padding: "10px" }}>
                                {loadingPage ?
                                    <div align="center"><LoadingOutlined /></div>
                                    :
                                    null}
                                {renderMessages()}
                            </div>
                        </Scrollbars>}

                    {/* chat footer */}
                    <Mobile>
                        <Row>
                            <Col span={24}>
                                <form className="mr-3 w-100" onSubmit={onSubmitMessage}>
                                    <div className="">
                                        <textarea
                                            type="text"
                                            id="search-msg"
                                            placeholder={t('write')}
                                            value={message || ""}
                                            className=" form-control"
                                            style={{ height: "50px", width: "100%" }}
                                            onChange={(event) => setMessage(event.target.value)}
                                            onFocus={onFocusInput}
                                            autoFocus={true}
                                            onKeyDown={handleKeyDown}
                                        />
                                    </div>
                                </form>
                            </Col>
                            <Col span={24}>
                                <Button
                                    type="primary"
                                    onClick={onSubmitMessage}
                                    className={isDesktopOrLaptop ? "" : "d-block mt-3"}
                                >
                                    {t('send')}
                                </Button></Col>
                        </Row>
                    </Mobile>
                    <Default>
                        <div className="chat-footer d-flex px-4 align-items-center py-3">
                            <form className="mr-3 w-100" onSubmit={onSubmitMessage}>
                                <div className="">
                                    <textarea
                                        type="text"
                                        id="search-msg"
                                        placeholder={t('write')}
                                        value={message || ""}
                                        className=" form-control"
                                        style={{ height: "50px", width: "100%" }}
                                        onChange={(event) => setMessage(event.target.value)}
                                        onFocus={onFocusInput}
                                        autoFocus={true}
                                        onKeyDown={(e) => {
                                            if (e.keyCode == 13) {
                                                onSubmitMessage(e);
                                            }
                                        }}
                                    />
                                </div>
                            </form>
                            <Button
                                type="primary"
                                onClick={onSubmitMessage}
                                className={isDesktopOrLaptop ? "" : "d-block mt-3"}
                            >
                                {t('send')}
                            </Button>
                        </div>
                    </Default>
                </React.Fragment> :
                    <React.Fragment>
                        <Row type="flex" justify="space-around" style={{ height: "100%" }}>
                            <Col className="text-center mt-4">
                                <MessageOutlined style={{ fontSize: "80px" }} />
                                <h5 className='mt-3'>{t('choose_one_to_chat')}</h5>
                            </Col>
                        </Row>
                    </React.Fragment>
                }
                <Modal
                    title={t("more_info")}
                    visible={visibleCI}
                    footer={false}
                    onCancel={() => setVisibleCI(false)}
                    centered={true}
                    maskClosable={true}
                    destroyOnClose={true}
                >
                    <ConversationInfo data={itemActive} config={config}></ConversationInfo>
                </Modal>
            </Col>
        </Row>
    )
}
