import React, { useState, useEffect } from 'react';
import { AppLayout } from '../../../layout';
import { withTranslation, Router } from '../../../i18n';
import { Row, Col, Form, Input, Button, Checkbox, Select, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { getDetailStay, getPrice, booking } from '../../../requests/stay';
import { checkCoupon } from '../../../requests/coupon';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import BReviewSideBar from '../../../components/BReview/BReviewSideBar';
import { PRIMARY_COLOR } from '../../../config';
import LoginContainer from '../../../components/LoginContainer';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import BReviewSideBarMobile from '../../../components/Room/BReviewSidebarMobile';

const { Option } = Select;

function BReview(props) {
    const { t } = props;
    const [form] = Form.useForm();
    const [isTransferBook, setIsTransferBook] = useState(false);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [coupon, setCoupon] = useState(null);
    const [couponCode, setCouponCode] = useState(null);
    const [couponApplying, setCouponApplying] = useState(false);
    const [kindOfTrip, setKindOfTrip] = useState("for_family");
    const [price, setPrice] = useState(null);
    const [isOnBooking, setIsOnBooking] = useState(false);
    const [writeNote, setWriteNote] = useState(false)

    const user = useSelector(state => state.auth.user);
    const router = useRouter();
    var query = router.query;
    let room = query.roomCount || 1;
    let totalGuest = parseInt(query.guest) + parseInt(query.children);
    let duration = moment(query.checkout, 'YYYY-MM-DD').diff(moment(query.checkin, 'YYYY-MM-DD'), 'days');

    useEffect(() => {
        if (user != null) {
            form.setFieldsValue({
                name: `${user.firstname} ${user.lastname}`,
                phone: user.mobile ? user.mobile.charAt(0) == '0' ? `${user.mobile}` : `0${user.mobile}` : null,
                email: user.email
            })
        }
    }, [user])

    useEffect(() => {
        getDetailStay(query.id).then(data => {
            setProperty(data);
            setLoading(false);
        });
        if (query.checkin && query.checkout) {
            getPrice(query.id, { ...query, guests: query.guest }).then(data => {
                setPrice(data);
                setLoading(false);
            })
        }
        else {
            getPrice(query.id, { ...query, guests: query.guest }).then(data => {
                setPrice(data);
                setLoading(false);
            })
        }
    }, []);

    var onApplyCoupon = () => {
        setCouponApplying(true);
        checkCoupon(couponCode, "STAY").then(data => {
            if (data.is_available) {
                setCoupon(data.coupon);
                message.success(t('apply_coupon_success'));
            }
            else {
                message.error(t('apply_coupon_failed'));
            }
            setCouponApplying(false);
        }).catch(err => {
            setCouponApplying(false);
            message.error(t('apply_coupon_failed'));
        })
    }

    var onRemoveCoupon = () => {
        setCoupon(null);
    }

    var _onAlertError = (err) => {
        let msg = '';
        switch (err.data.data) {
            case 'PRICE_NOT_TRUE':
                msg = t('PRICE_NOT_TRUE');
                break;
            case 'EMPTY_INFO_CUSTOMER':
                msg = t('EMPTY_INFO_CUSTOMER');
                break;
            case 'INVALID_MOBILE':
                msg = t('INVALID_MOBILE');
                break;
            case 'INVALID_EMAIL':
                msg = t('INVALID_EMAIL');
                break;
            case 'INVALID_COUPON':
                msg = t('INVALID_COUPON');
                break
            case 'DUPLICATE_BOOKING':
                msg = t('DUPLICATE_BOOKING');
                break;
            case 'NIGHTS_EXCEED':
                msg = t('NIGHTS_EXCEED');
                break;
            case 'ROOMS_EXCEED':
                msg = t('ROOMS_EXCEED');
                break;
            default:
                msg = t('DEFAULT_ERROR');
                break;
        }
        message.error(msg);
    }

    const onFinish = (values) => {
        if (user == null) {
            message.info(t('require_login'))
            return;
        }
        setIsOnBooking(true);
        if (!user) return;
        let data = {
            checkin: query.checkin,
            checkout: query.checkout,
            room_id: query.id,
            guests: parseInt(query.guest),
            children: parseInt(query.children),
            total: price.total,
            customer_info: {
                name_id: values.name,
                phone: values.phone,
                email: values.email
            },
            is_transfer_book: isTransferBook ? 1 : 0,
            kind_of_trip: kindOfTrip,
            transferee: {
                name: values.transferee_name,
                phone: values.transferee_phone,
                email: values.transferee_email
            },
            coupon: coupon,
            notes: writeNote ? values.notes : "",
            roomCount: query.roomCount > 1 ? query.roomCount : ''
        }

        booking(data).then(data => {
            setIsOnBooking(false);
            Router.push(`/payment/epay/options?orderNumber=${data.order_number}`);
        }).catch(err => {
            _onAlertError(err);
            setIsOnBooking(false);
        })

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    let detailGuest = query.children > 0 ? `${query.guest} ${t('adult')}, ${query.children} ${t('children')}` : `${query.guest} ${t('adult')}`;

    return (
        <AppLayout>
            <div className="container">
                {loading ?
                    <div className="d-flex justify-content-center">
                        <Loader type="ThreeDots" color={PRIMARY_COLOR} height="100" width="100" />
                    </div> :
                    <Row className="breview-container" gutter={50}>
                        <Col sm={24} md={24} lg={16} xs={24}>
                            <div>
                                <div className="mb-4">
                                    <span className="title-lv-1">{t('booking_info')}</span>
                                </div>
                                <LoginContainer />
                                <div className="mt-4 pt-2">
                                    <span className="text-bold text-md">{t('number_of_custumer')}</span>
                                    <div className="card mt-3">
                                        <span>
                                            <span className="mr-4"><FontAwesomeIcon icon={faUser} size={"lg"} /></span>
                                            <span className="text-md">
                                                {`${totalGuest} ${t('customer')} (${detailGuest})`}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4">
                                    <span className="text-bold text-md">{`${duration} đêm tại ${property ? property.title : ''}`}</span>
                                    <Row className="card mt-3 ant-row d-flex">
                                        <Col span={10} className="m-0 checkin-block pb-3">
                                            <span className="text-md text-gray d-block mb-2">{t('checkin')}</span>
                                            <span className="text-lg mb-2 d-block text-bold">{moment(query.checkin, 'YYYY-MM-DD').format('DD/MM/YYYY')}</span>
                                            <span className="text-sm d-block">{moment(query.checkin, 'YYYY-MM-DD').format('dddd')}</span>

                                        </Col>
                                        <Col span={4} className="text-center">
                                            {/* 4 đêm */}
                                        </Col>

                                        <Col span={10} className="m-0 checkout-block pb-3">
                                            <span className="text-md text-gray d-block mb-2">{t('checkout')}</span>
                                            <span className="text-lg mb-2 d-block text-bold">{moment(query.checkout, 'YYYY-MM-DD').format('DD/MM/YYYY')}</span>
                                            <span className="text-sm d-block">{moment(query.checkout, 'YYYY-MM-DD').format('dddd')}</span>
                                        </Col>
                                    </Row>

                                </div>
                            </div>

                            {/* start customer info  */}
                            <Form
                                form={form}
                                layout="vertical"
                                onValuesChange={() => { }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                initialValues={{
                                    name: user ? `${user.firstname} ${user.lastname}` : '',
                                    phone: user && user.mobile ? user.mobile.charAt(0) == '0' ? `${user.mobile}` : `0${user.mobile}` : null,
                                    email: user ? user.email : ''
                                }}
                            >
                                <div className="mt-4 pt-4">
                                    <span className="title-lv-1">{t('your_info')}</span>
                                    <div className="mt-4 pt-2">
                                        <Form.Item
                                            label={<span className="text-md text-bold" >{t('name_customer')}</span>}
                                            tooltip={t('name_on_id_card')}
                                            name="name"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={t('name_customer')} />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label={<span className="text-md text-bold">{t('phone')}</span>}
                                            required tooltip={t('phone_input_tooltips')}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={t('phone')} />
                                        </Form.Item>

                                        <Form.Item
                                            label={<span className="text-md text-bold">Email</span>}
                                            required tooltip="VD: email@example.com"
                                            rules={[{ required: true, type: "email" }]}
                                            name="email"
                                        >
                                            <Input placeholder="Email" />
                                        </Form.Item>

                                        <Form.Item
                                            name="isTransferBook"
                                            valuePropName="checked"
                                        >
                                            <Checkbox value={isTransferBook} onChange={(e) => {
                                                setIsTransferBook(e.target.checked);
                                            }}>
                                                <span className="text-md"> {t('i_book_for_other')}</span>
                                            </Checkbox>
                                        </Form.Item>

                                        {isTransferBook &&
                                            <React.Fragment>
                                                <Form.Item
                                                    label={<span className="text-md text-bold">{t('name_customer')}</span>}
                                                    tooltip={t('name_on_id_card')}
                                                    name="transferee_name"
                                                    rules={[{ required: isTransferBook }]}
                                                >
                                                    <Input placeholder={t('name_customer')} />
                                                </Form.Item>
                                                <Form.Item
                                                    label={<span className="text-md text-bold">{t('phone')}</span>}
                                                    required tooltip={t('phone_input_tooltips_other')}
                                                    name="transferee_phone"
                                                    rules={[{ required: isTransferBook }]}
                                                >
                                                    <Input placeholder={t('phone')} />
                                                </Form.Item>

                                                <Form.Item
                                                    label={<span className="text-md text-bold">Email</span>}
                                                    required tooltip="VD: email@example.com"
                                                    name="transferee_email"
                                                    rules={[{ required: isTransferBook, type: "email" }]}
                                                >
                                                    <Input placeholder="Email" />
                                                </Form.Item>
                                            </React.Fragment>
                                        }

                                        <div className="mt-4 pt-4">
                                            <span className="title-lv-1">{t('add_info')}</span>
                                            <div className="mt-4 pt-2">
                                                <Form.Item
                                                    name="select"
                                                    label={<span className="text-md text-bold">{t('kind_of_trip')}</span>}
                                                >
                                                    <Select placeholder="Please select an option" value={kindOfTrip} onChange={(v) => setKindOfTrip(v)} defaultValue="for_family">
                                                        <Option value="for_family">{t('for_family')}</Option>
                                                        <Option value="for_party">{t('for_party')}</Option>
                                                        <Option value="for_business">{t('for_business')}</Option>
                                                        <Option value="other">{t('Other')}</Option>
                                                    </Select>
                                                </Form.Item>
                                            </div>

                                            <Form.Item
                                                name="notes"
                                                label={<Checkbox value={writeNote} onChange={() => { setWriteNote(!writeNote) }} >
                                                    <span className="text-md"> {t('note')}</span>
                                                </Checkbox>}
                                            >
                                                {writeNote && <Input.TextArea></Input.TextArea>}
                                            </Form.Item>

                                        </div>


                                    </div>
                                    <div className="mt-4 pt-4">
                                        <span className="title-lv-1">{t('coupon')}</span>
                                        <Row gutter={50} className="mt-4 pt-2">
                                            <Col span={18}>
                                                <Input placeholder={t('Enter_a_coupon_code')} onChange={(e) => { setCouponCode(e.target.value) }} disabled={!!coupon} suffix={
                                                    !!coupon ? <CheckCircleOutlined /> : null
                                                } />
                                            </Col>
                                            <Col span={4} className="text-center justify-content-center d-flex">
                                                {!!coupon ?
                                                    <Button className="primary-purple" type="primary" onClick={onRemoveCoupon} >{t('rm_apply')}</Button> :
                                                    <Button className="primary-purple" type="primary" onClick={onApplyCoupon} disabled={!user} loading={couponApplying}>{t('apply')}</Button>
                                                }
                                            </Col>
                                        </Row>
                                    </div>

                                    <Form.Item className="mt-4 pt-4 d-flex align-items-center">
                                        <Button type="primary" htmlType="submit" loading={isOnBooking} disabled={couponApplying || user == null} size="large">{t('payment')}</Button>
                                        {user == null && <span className="d-inline-block ml-3"> {t('require_login')}</span>}
                                    </Form.Item>

                                </div>
                            </Form>
                            {/* end customer info  */}
                        </Col>

                        {/* col room sidebar */}
                        <Col sm={0} md={0} lg={8} xs={0} >
                            <div style={{ position: "sticky", top: 20 }}>
                                <span className="title-widget mb-4 d-block">{t('room_book_info')}</span>
                                <BReviewSideBar t={t} property={property} coupon={coupon} price={price} room={room} />
                            </div>
                        </Col>
                        {/* end col room sidebar */}
                    </Row>
                }

            </div>

            {/* booking review area if small device */}
            <Row className="fixed-bottom  has-border-top" style={{ backgroundColor: "#fff" }}>
                <Col xs={24} sm={24} md={24} lg={0} className="pb-2 pl-4 pr-4 pt-2">
                    <BReviewSideBarMobile t={t} property={property} coupon={coupon} price={price} type={'review'} room={room}/>
                </Col>
            </Row>
        </AppLayout >
    )
}

export default withTranslation('stayList')(BReview);
