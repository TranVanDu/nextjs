import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Typography, Button, Form, Divider, Input, Modal } from 'antd';
import { AppLayout } from '../../../layout';
import { withTranslation, Router } from '../../../i18n';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { convertClassOfFlightBooking, convertTime, generateAirline, priceInVn } from '../../../helpers/helpers';
import FlightPassengerForm from '../../../components/FlightPassengerForm';
import FlightContactForm from '../../../components/FlightContactForm';
import LoginContainer from '../../../components/LoginContainer';
// api requests
import { bookFlight } from '../../../requests/flight';
import { checkCoupon } from '../../../requests/coupon';

const { Title } = Typography;

const BookingInformation = (props) => {
    var { t } = props;
    const [form] = Form.useForm();
    const config = useSelector((state) => state.config);
    const user = useSelector((state) => state.auth.user);
    const [currentQuery, setCurrentQuery] = useState({});
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [currentDataSession, setCurrentDataSession] = useState(null);
    const [loading, setLoading] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [loadingCheckCouponCode, setLoadingCheckCouponCode] = useState(false);

    var totalPrice = 0;
    selectedFlights.forEach(flight => {
        totalPrice += flight.TotalPrice + flight.IssueFee + flight.ServiceFee;
    });

    useEffect(() => {
        setCurrentQuery(JSON.parse(localStorage.getItem('flightQuery')));
        setSelectedFlights(JSON.parse(localStorage.getItem('selectedFlights')));
        setCurrentDataSession(localStorage.getItem('flightDataSession'));
    }, []);

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                contact_firstName: user.firstname,
                contact_lastName: user.lastname,
                contact_phone: user.mobile,
                contact_email: user.email,
            })
        }
    }, [user]);

    const onApplyCoupon = () => {
        setLoadingCheckCouponCode(true);
        checkCoupon(couponCode, "FLIGHT").then(data => {
            if (data.is_available) {
                setAppliedCoupon(data.coupon);
                Modal.success({
                    title: t('apply_coupon_success')
                });
            }
            else {
                Modal.error({
                    title: t('apply_coupon_failed')
                });
            }
            setLoadingCheckCouponCode(false);
        }).catch(err => {
            Modal.error({
                title: t('apply_coupon_failed')
            });
            setLoadingCheckCouponCode(false);
        })
    }

    const onRemoveCoupon = () => {
        setAppliedCoupon(null);
    }

    const onCheckout = () => {
        form.validateFields().then(values => {
            Modal.confirm({
                title: t('confirm_booking_title'),
                content: t('confirm_booking_content'),
                okText: t('continue_to_payment'),
                cancelText: t('check_again'),
                onOk: async () => {
                    setLoading(true);

                    let passengerCount = parseInt(currentQuery.adults) + parseInt(currentQuery.childrens) + parseInt(currentQuery.infants);

                    var orderData = {
                        total: totalPrice,
                        subtotal: totalPrice,
                        departure_date: moment(selectedFlights[0].StartDate).format('YYYY-MM-DD HH:mm:ss'),
                        discount: config.flight_markup * passengerCount,
                        notes: values.notes,
                        flight_info: {
                            departure: selectedFlights[0],
                            dataSession: currentDataSession
                        }
                    };
                    if (selectedFlights[1]) {
                        orderData.return_date = moment(selectedFlights[1].StartDate).format('YYYY-MM-DD HH:mm:ss');
                        orderData.flight_info.return = selectedFlights[1];
                    }

                    orderData.customer_info = {
                        firstName: values.contact_firstName,
                        lastName: values.contact_lastName,
                        phone: values.contact_phone,
                        email: values.contact_email,
                    };

                    var passengers = [];
                    Array.from(Array(parseInt(currentQuery.adults)).keys()).map(item => {
                        let key = `adults[${item}]`;
                        passengers.push({
                            firstname: values[`${key}['first_name']`],
                            lastname: values[`${key}['last_name']`],
                            birthday: moment(values[`${key}['birthday']`]).format('YYYY-MM-DD'),
                            gender: values[`${key}['gender']`],
                            mobile: values[`${key}['phone']`],
                            passenger_type: 'PASSENGER_ADULT'
                        });
                    });
                    Array.from(Array(parseInt(currentQuery.childrens)).keys()).map(item => {
                        let key = `childrens[${item}]`;
                        passengers.push({
                            firstname: values[`${key}['first_name']`],
                            lastname: values[`${key}['last_name']`],
                            birthday: moment(values[`${key}['birthday']`]).format('YYYY-MM-DD'),
                            gender: values[`${key}['gender']`],
                            mobile: null,
                            passenger_type: 'PASSENGER_CHILDREN'
                        });
                    });
                    Array.from(Array(parseInt(currentQuery.infants)).keys()).map(item => {
                        let key = `infants[${item}]`;
                        passengers.push({
                            firstname: values[`${key}['first_name']`],
                            lastname: values[`${key}['last_name']`],
                            birthday: moment(values[`${key}['birthday']`]).format('YYYY-MM-DD'),
                            gender: values[`${key}['gender']`],
                            mobile: null,
                            passenger_type: 'PASSENGER_INFANT'
                        });
                    });

                    orderData.passengers = passengers;

                    if (appliedCoupon) {
                        orderData.coupon_code = appliedCoupon.code;
                        orderData.coupon_amount = appliedCoupon.amount < orderData.subtotal ? appliedCoupon.amount : orderData.subtotal;
                        orderData.total = appliedCoupon.amount < orderData.subtotal ? orderData.subtotal - appliedCoupon.amount : 0;
                    }

                    bookFlight(orderData).then((order) => {
                        setLoading(false);
                        Router.push(`/payment/epay/options?orderNumber=${order.order_number}`);
                    });

                }
            });
        }).catch(error => {
            console.log(error);
            Modal.error({
                title: t('error_fill_required_field')
            });
        })
    }

    return (
        <AppLayout
            title={t('flight')}
        >
            <div className="gray-background">
                <div className="container mt-4">
                    <Title level={2}>{t('your_booking')}</Title>
                    <Row gutter={[16, 16]}>
                        <Col lg={16} md={24} sm={24} xs={24}>
                            <LoginContainer />
                            <Form
                                layout="vertical"
                                form={form}
                            >
                                <Title level={4}>{t('contact_information')}</Title>
                                <FlightContactForm />
                                <Title level={4} className="mt-4">{t('passenger_information')}</Title>
                                {
                                    currentQuery.adults ? (
                                        <div>
                                            {
                                                Array.from(Array(parseInt(currentQuery.adults)).keys()).map(item => (
                                                    <FlightPassengerForm key={item} name="adults" index={item} title={`${t('adult')} ${item + 1}`} />
                                                ))
                                            }
                                        </div>
                                    ) : null
                                }
                                {
                                    currentQuery.childrens ? (
                                        <div>
                                            {

                                                Array.from(Array(parseInt(currentQuery.childrens)).keys()).map(item => (
                                                    <FlightPassengerForm key={item} name="childrens" index={item} title={`${t('children')} ${item + 1}`} />
                                                ))
                                            }
                                        </div>
                                    ) : null
                                }
                                {
                                    currentQuery.infants ? (
                                        <div>
                                            {

                                                Array.from(Array(parseInt(currentQuery.infants)).keys()).map(item => (
                                                    <FlightPassengerForm key={item} name="infants" index={item} title={`${t('infant')} ${item + 1}`} />
                                                ))
                                            }
                                        </div>
                                    ) : null
                                }
                            </Form>
                        </Col>
                        <Col lg={8} md={24} sm={24} xs={24}>
                            <Card
                                title={t('your_flights')}
                                className="checkout_preview_flights_card"
                            >
                                {
                                    selectedFlights.map((flight, index) => {
                                        let airline = generateAirline(flight.AirlineCode);
                                        let fareClass = convertClassOfFlightBooking(flight.Class);

                                        return (
                                            <div key={index}>
                                                <div className="preview-fl-title">{index == 0 ? t('departure') : t('return')} • {moment(flight.StartDate).format('ll')}</div>
                                                <Row justify="space-between" align="middle" className="mt-2">
                                                    <div>
                                                        <div className="preview-fl-title">{airline.name} - {flight.FlightNumber}</div>
                                                        <div>{fareClass}</div>
                                                    </div>
                                                    <div>
                                                        <img className="lf-air-logo" src={airline.logo} />
                                                    </div>
                                                </Row>
                                                <Row justify="space-between" align="middle" className="mt-2">
                                                    <div className="text-center">
                                                        <div className="preview-fl-title">{moment(flight.StartDate).format('HH:mm')}</div>
                                                        <div>{flight.StartPoint}</div>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon icon={faArrowRight} size="sm" />
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="preview-fl-title">{moment(flight.EndDate).format('HH:mm')}</div>
                                                        <div>{flight.EndPoint}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="preview-fl-title">{convertTime(flight.Duration)}</div>
                                                        <div>{flight.ListSegment.length == 1 ? t('direct_flight') : `${flight.ListSegment.length} ${t('stops')}`}</div>
                                                    </div>
                                                </Row>
                                                <Divider />
                                            </div>
                                        )
                                    })
                                }
                                <div className="mb-4">
                                    <Row justify="space-between" align="middle">
                                        <div>{t('fare_price')} (x{parseInt(currentQuery.adults) + parseInt(currentQuery.childrens) + parseInt(currentQuery.infants)})</div>
                                        <div className="fl-checkout-item-value">
                                            {priceInVn(totalPrice)}
                                        </div>
                                    </Row>
                                    <Row justify="space-between" align="middle">
                                        <div>{t('fee_and_tax')}</div>
                                        <div className="fl-checkout-item-value">{t('included')}</div>
                                    </Row>
                                    {
                                        appliedCoupon ? (
                                            <Row justify="space-between" align="top">
                                                <div>
                                                    <div>{t('applied_coupon')}</div>
                                                    <div className="fl-change-coupon">
                                                        <Button size="small" type="link" className="p-0" onClick={() => onRemoveCoupon()}>
                                                            {t('change_coupon')}
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="fl-checkout-item-value">
                                                    -{priceInVn(appliedCoupon.amount > totalPrice ? totalPrice : appliedCoupon.amount)}
                                                </div>
                                            </Row>
                                        ) : (
                                                <Row gutter={12} className="mt-4 mb-4">
                                                    <Col md={15} sm={15} xs={15}>
                                                        <Input placeholder={t('coupon_code')} onChange={(e) => setCouponCode(e.target.value)} />
                                                    </Col>
                                                    <Col md={9} sm={9} xs={9}>
                                                        <Button
                                                            type="primary"
                                                            style={{ width: '100%' }}
                                                            onClick={() => onApplyCoupon()}
                                                            loading={loadingCheckCouponCode}
                                                            disabled={!user}
                                                        >
                                                            {t('apply')}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            )
                                    }

                                    <Divider className="mt-1 mb-2" />
                                    <Row justify="space-between" align="middle" className="fl-checkout-total">
                                        <div>{t('total')}</div>
                                        <div>
                                            {priceInVn(appliedCoupon ? (totalPrice - appliedCoupon.amount || 0) : totalPrice)}
                                        </div>
                                    </Row>
                                </div>

                                <div className="text-center">
                                    <Button type="primary" size="large" onClick={() => onCheckout()} loading={loading} disabled={!user}>
                                        {t('checkout')}
                                    </Button>
                                    <div>
                                        {
                                            !user ? <small>{t('need_login_before_checkout')}</small> : null
                                        }
                                    </div>
                                </div>
                            </Card>

                        </Col>
                    </Row>
                </div>
            </div>
        </AppLayout>

    )
}

export default withTranslation('flight')(BookingInformation);