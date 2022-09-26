import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../../components/Sidebar';
import UserTask from '../../../components/UserTask';
import { i18n, withTranslation, Router } from '../../../i18n';
import { useRouter } from 'next/router'
import { AppLayout } from '../../../layout';
import { useLoginToken } from '../../../components/login/useLoginToken';
import { useSelector, useDispatch } from 'react-redux';
import Pusher from 'pusher-js';
import { setNewMessage } from '../../../redux/actions/chat';
import { useWindowSize } from '../../../components/useWindowSize';

function Dashboard(props) {

    const { user, loading } = useLoginToken();
    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = props;
    const windowSize = useWindowSize();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                Router.push({ pathname: '/login', query: { nextpathname: router.pathname, nextaspath: router.asPath } })
            }
        }
    }, [loading])

    const authUser = useSelector(state => state.auth.user);
    const inbox = useSelector(state => state.inbox.newMessage);
    useEffect(() => {
        if (authUser) {
            const channelMessage = pusher.subscribe(authUser.id.toString());
            channelMessage.bind('2stay-chat', function (data) {
                // console.log(data, 'data from pusher');
                dispatch(setNewMessage(data));
            });
            return function cleanup() {
                pusher.unsubscribe(authUser.id.toString());
            }
        }
    }, [authUser])


    const pusher = new Pusher('1d791ad9af00262595f0', {
        cluster: 'ap1',
    });

    useEffect(() => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, [router.query])

    var task = "";
    var activeTab = "";
    if (router.query) {
        if (router.query.task) task = router.query.task.toString();
        if (router.query.activeTab) activeTab = router.query.activeTab.toString();
    }


    return (
        <AppLayout
            title={t('2stay')}
            layoutStyle={{ backgroundColor: "rgb(245,245,245)" }}
        >
            <div className="container" style={{ marginBottom: "40px", marginTop: "40px", backgroundColor: "rgb(245,245,245)" }}>
                <Layout>
                    {windowSize && windowSize.width && windowSize.width > 1024 ?
                        <Sidebar task={task} account={user} />
                        : null}
                    <UserTask task={task} activeTab={activeTab}></UserTask>
                </Layout>
            </div>
        </AppLayout>
    )
}


export default withTranslation('user_task')(Dashboard);