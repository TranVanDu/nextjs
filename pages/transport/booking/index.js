import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../../layout';
import { withTranslation, Router } from '../../../i18n';
import { useRouter } from 'next/router';
import { Row, Card, Col, Form, Typography, Input, Button, message, Steps, Result, Affix, Select, Divider } from 'antd';
import dataCodeNumberPhone from '../../../components/share/dataCodeNumberPhone';
import BaseSelect from '../../../components/BaseSelect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckCircleOutlined } from '@ant-design/icons';
import { checkCoupon } from '../../../requests/coupon';
import { useLoginToken } from '../../../components/login/useLoginToken';
import LoadingBooking from '../../../components/TransportComponent/LoadingBooking';
import { requestGetRouteDetail, requestBookingTransport } from '../../../requests/transport';
import { getRoutePrice } from '../../../helpers/transport';
import { priceInVn } from '../../../helpers/helpers';
import moment from 'moment';
import LoginContainer from '../../../components/LoginContainer';
import { useWindowSize } from '../../../components/useWindowSize';

const { Option } = Select;
const { Step } = Steps;

const { Title } = Typography;
const dataPhone = dataCodeNumberPhone.map(item => {
    return {
        id: item.dial_code,
        title: `${item.name} (${item.dial_code})`
    }
})
const DATA_CONTACT = [
    {
        id: "Skype",
        title: "Skype"
    },
    {
        id: "Whatsapp",
        title: "Whatsapp"
    },
    {
        id: "LINE",
        title: "LINE"
    },
    {
        id: "WeChat",
        title: "WeChat"
    },
]

function useGetRoute(id) {
    const [loading, setLoading] = useState(true);
    const [route, setRoute] = useState(null);
    useEffect(() => {
        requestGetRouteDetail(id).then(res => {
            setRoute(res);
            setLoading(false);
        }).catch(err => setLoading(false));
    }, [])
    return { route, loadingRoute: loading };
}


const TransportBooking = (props) => {
    const { t } = props;
    const router = useRouter();
    var { query } = router;
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const { user, loading } = useLoginToken();
    const { route, loadingRoute } = useGetRoute(query.route_id);
    const [coupon, setCoupon] = useState(null);
    const [couponCode, setCouponCode] = useState(null);
    const [couponApplying, setCouponApplying] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // useEffect(() => {
    //     if (!loading) {
    //         if (!user) {
    //             Router.push({ pathname: "/login", query: { nextpathname: "/transport/booking", ...query } })
    //         }
    //     }
    // }, [loading])

    useEffect(() => {
        if (user) {
            form2.setFieldsValue(user)
        }
    }, [user])

    const windowSize = useWindowSize();


    const onApplyCoupon = () => {
        setCouponApplying(true);
        checkCoupon(couponCode, "CAR").then(data => {
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

    const onRemoveCoupon = () => {
        setCoupon(null);
    }

    const onBooking = (values) => {
        var { price, promotion } = getRoutePrice(route, query.type, query.time);
        var total = price - promotion;
        if (coupon) total = total - coupon.amount;
        if (total < 0) total = 0;
        const data = {
            total: total,
            type: query.type,
            time: moment(query.time, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),
            passenger: query.passenger,
            route_id: route.id,
            codeflight: "1111",
            address: query.address,
            sub_address: query.sub_address,
            info_customer: {
                passport_firstname: values.firstname,
                passport_lastname: values.lastname,
                phonecode: values.phone_code,
                phone: values.mobile,
                email: values.email
            },
            coupon: coupon
        }
        let data_extra_info = form1.getFieldsValue();
        if (data_extra_info.phone || data_extra_info.phonecode || data_extra_info.contact_info || data_extra_info.idcontact || data_extra_info.note) {
            data.data_extra_info = data_extra_info;
        }
        setLoadingSubmit(true);
        requestBookingTransport(data).then(res => {
            // message.success("Đặt hàng thành công!");
            setLoadingSubmit(false);
            Router.push(`/payment/epay/options?orderNumber=${res.order_number}`)
        }).catch(err => {
            setLoadingSubmit(false);
            message.error(t('booking_fail'))
        })
    }



    var { price, promotion } = { price: 0, promotion: 0 }
    if (route && query) {
        var { price, promotion } = getRoutePrice(route, query.type, query.time);
        const { free_waiting_time, free_waiting_time_i, free_waiting_time_return } = route;
        var free_waiting = 0;
        if (query.type == 1) free_waiting = Math.max(free_waiting_time, free_waiting_time_i);
        else free_waiting = free_waiting_time_return;

    }
    return (
        <AppLayout>
            <div className="gray-background">
                <div className="container mt-5 mb-5">
                    {loading || loadingRoute ? <LoadingBooking /> :
                        route ?
                            <Row gutter={[20, 20]}>
                                <Col lg={16} md={24} xs={24} sm={24} >
                                    <LoginContainer />
                                    {windowSize.width < 992 ?
                                        <Card className="t-b-box-shadow mb-4">
                                            <div className="transport-package-name">
                                                <div className="package-image" style={{ backgroundImage: "url(https://static.mozio.com/de/vehicles/MercedesEClasse.png)" }}></div>
                                                <div className="package-title">
                                                    <p className="title">{route.vehicle.title}</p>
                                                    <div className="info">
                                                        <p className="info-item"><FontAwesomeIcon icon={["fas", "user-tie"]} color="#b2b2b2" />&nbsp;{route.vehicle.seat}</p>
                                                        <p className="info-item"><FontAwesomeIcon icon={["fas", "suitcase-rolling"]} color="#b2b2b2" />&nbsp;{route.vehicle.luggage}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ paddingTop: "20px" }}>
                                                <Steps progressDot size="small" direction="vertical">
                                                    <Step title={<span style={{ fontWeight: "600", color: "#333" }}>{query.type == 1 ? query.airport_title : query.sub_address}</span>} />
                                                    <Step title={<span style={{ fontWeight: "600", color: "#333" }}>{query.type == 1 ? query.sub_address : query.airport_title}</span>} />
                                                </Steps>
                                            </div>
                                            <div className="transport-info">
                                                <p className="t-i-content">{query.time} ({t('local_time')})</p>
                                                <p className="t-i-content">{query.passenger} {t('passenger')}</p>
                                                {free_waiting ? <p className="t-i-content">{t('free')}{' '}{free_waiting}{' '}{t('minus')}{' '}{t('waiting_time')}</p> : null}
                                            </div>
                                            {route.route_services && route.route_services.length ? (
                                                <div className="include-service">
                                                    <div className="service-title">{t('Inclusive_Service')}</div>
                                                    {route.route_services.map((item, index) => (<p className="service-content" key={index}>{item.title}</p>))}
                                                </div>)
                                                : null}
                                            {route.price_add_holiday ? (
                                                <div className="include-service">
                                                    <p>{t("surcharge")} {priceInVn(route.price_add_holiday)} {t("during_holidays")}</p>
                                                </div>
                                            ) : null}
                                            <div style={{ paddingTop: "20px" }}>
                                                <p style={{ fontSize: "12px", color: "#999" }}>{t('service_provice_by')}{' '}{route.company_name}</p>
                                            </div>
                                        </Card>
                                        : null}
                                    <Card className="t-b-box-shadow">
                                        <div>
                                            <div className="header-my-db">
                                                <Title level={4} className="title-my-db">{t('passenger_info')}</Title>
                                            </div>
                                            <Form
                                                form={form2}
                                                className="form-infor-account"
                                                onFinish={onBooking}
                                            // initialValues={user}
                                            >
                                                <p className="account-input-lable">{t('full_name')}<span style={{ color: "red" }}>*</span></p>
                                                <Row gutter={16}>
                                                    <Col sm={12} xs={24}>
                                                        <Form.Item
                                                            name="firstname"
                                                            rules={[{ required: true, message: t('first_name_required') }]}
                                                        >
                                                            <Input
                                                                placeholder={t('first_name')}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col sm={12} xs={24}>
                                                        <Form.Item
                                                            name="lastname"
                                                            rules={[{ required: true, message: t('last_name_required') }]}
                                                        >
                                                            <Input
                                                                placeholder={t('last_name')}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <p className="account-input-lable">{t('phone_number')}<span style={{ color: "red" }}>*</span></p>
                                                <Row gutter={16}>
                                                    <Col sm={8} xs={24}>
                                                        <Form.Item
                                                            name="phone_code"
                                                            rules={[{ required: true, message: t('phone_code_required') }]}
                                                        >
                                                            <BaseSelect
                                                                className="setting-select"
                                                                options={dataPhone}
                                                                defaultText={t('phone_code')}
                                                                filterOption={(input, option) =>
                                                                    option.props.children
                                                                        .toLowerCase()
                                                                        .indexOf(input.toLowerCase()) >= 0
                                                                }
                                                                showSearch={true}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col sm={16} xs={24}>
                                                        <Form.Item
                                                            name="mobile"
                                                            rules={[{ required: true, message: t('phone_number_requied') }]}
                                                        >
                                                            <Input
                                                                placeholder={t("phone_number")}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <p className="account-input-lable">{t('email_address')}<span style={{ color: "red" }}>*</span></p>
                                                <Row gutter={16}>
                                                    <Col sm={24} xs={24}>
                                                        <Form.Item
                                                            name="email"
                                                            rules={[
                                                                {
                                                                    type: 'email',
                                                                    message: t('email_not_valid'),
                                                                },
                                                                { required: true, message: t('email_required') }

                                                            ]}
                                                            normalize={value => value.trim()}
                                                        >
                                                            <Input
                                                                placeholder={t('email_address')} className="input-width-40"
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Form
                                                    className="form-infor-account"
                                                    form={form1}
                                                >
                                                    <p className="account-input-lable">{t('special_requirement')}</p>
                                                    <Row gutter={16}>
                                                        <Col sm={24} xs={24}>
                                                            <Form.Item
                                                                name="note"
                                                            >
                                                                <Input.TextArea
                                                                    placeholder={t('special_requirement_c')} className="input-width-40"
                                                                    rows={4}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Form>
                                        </div>
                                        <div className="mt-5 pb-5">
                                            <div className="header-my-db">
                                                <Title level={4} className="title-my-db">{t('promo_code')}</Title>
                                                <p className="title-desc-my-db">{t("enter_your_promo_code_to_redeem")}</p>

                                            </div>
                                            <Row gutter={[5, 5]} className="mt-4 pt-2">
                                                <Col md={18} xs={24} sm={24}>
                                                    <Input placeholder={t('Enter_a_coupon_code')} onChange={(e) => { setCouponCode(e.target.value) }} disabled={!!coupon} suffix={
                                                        !!coupon ? <CheckCircleOutlined /> : null
                                                    } />
                                                </Col>
                                                <Col md={6} xs={24} sm={24}>
                                                    {!!coupon ?
                                                        <Button type="primary" onClick={onRemoveCoupon} >{t('rm_apply')}</Button> :
                                                        <Button type="primary" onClick={onApplyCoupon} disabled={!couponCode || !user} loading={couponApplying}>{t('apply')}</Button>
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                        {windowSize.width < 992 ? (
                                            <>
                                                <Divider style={{ marginTop: "0px" }} />
                                                <div className="t-b-price">
                                                    <p>
                                                        <span>{t('base_pare')}</span>
                                                        <span className="base-pare" >{priceInVn(price)}</span>
                                                    </p>
                                                    {promotion ?
                                                        <p>
                                                            <span>{t('promotion')}</span>
                                                            <span className="base-pare" >-{priceInVn(promotion)}</span>
                                                        </p>
                                                        : null}
                                                    {coupon ?
                                                        <p>
                                                            <span>{t('discount')}</span>
                                                            <span className="base-pare" >-{(price - promotion) < coupon.amount ? priceInVn(price - promotion) : priceInVn(coupon.amount)}</span>
                                                        </p>
                                                        : null}
                                                    <p>
                                                        <span>{t('total')}</span>
                                                        {coupon ? <span className="total-pare">{priceInVn(price - promotion - coupon.amount)}</span> : <span className="total-pare">{priceInVn(price - promotion)}</span>}
                                                    </p>
                                                </div>
                                                <div className="t-b-cancel-h">
                                                    <p>{t('free_cancellation')}{' '}{route.cancel_hour_policy}{' '}{t('hour')}{' '}{t('before_your_pick_up_time')}</p>
                                                </div>
                                            </>
                                        ) : null}
                                        <Row className="t-b-submit" align="middle">
                                            <Col md={18} xs={24} sm={24}>
                                                <p className="submit-tip">{user ? t('submit_tip') : t('require_login')}</p>
                                            </Col>
                                            <Col md={6} xs={24} sm={24}>
                                                <Button type="primary" className="btn-book" onClick={() => form2.submit()} loading={loadingSubmit} disabled={!user || couponApplying}>{t('book_now')}</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                                {windowSize.width >= 992 ?
                                    <Col lg={8} md={24} xs={24} sm={24} >
                                        <Card className="t-b-box-shadow">
                                            <div className="transport-package-name">
                                                <div className="package-image" style={{ backgroundImage: "url(https://static.mozio.com/de/vehicles/MercedesEClasse.png)" }}></div>
                                                <div className="package-title">
                                                    <p className="title">{route.vehicle.title}</p>
                                                    <div className="info">
                                                        <p className="info-item"><FontAwesomeIcon icon={["fas", "user-tie"]} color="#b2b2b2" />&nbsp;{route.vehicle.seat}</p>
                                                        <p className="info-item"><FontAwesomeIcon icon={["fas", "suitcase-rolling"]} color="#b2b2b2" />&nbsp;{route.vehicle.luggage}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ paddingTop: "20px" }}>
                                                <Steps progressDot size="small" direction="vertical">
                                                    <Step title={<span style={{ fontWeight: "600", color: "#333" }}>{query.type == 1 ? query.airport_title : query.sub_address}</span>} />
                                                    <Step title={<span style={{ fontWeight: "600", color: "#333" }}>{query.type == 1 ? query.sub_address : query.airport_title}</span>} />
                                                </Steps>
                                            </div>
                                            <div className="transport-info">
                                                <p className="t-i-content">{query.time} ({t('local_time')})</p>
                                                <p className="t-i-content">{query.passenger} {t('passenger')}</p>
                                                {free_waiting ? <p className="t-i-content">{t('free')}{' '}{free_waiting}{' '}{t('minus')}{' '}{t('waiting_time')}</p> : null}
                                            </div>
                                            {route.route_services && route.route_services.length ? (
                                                <div className="include-service">
                                                    <div className="service-title">{t('Inclusive_Service')}</div>
                                                    {route.route_services.map((item, index) => (<p className="service-content" key={index}>{item.title}</p>))}
                                                </div>)
                                                : null}
                                            {route.price_add_holiday ? (
                                                <div className="include-service">
                                                    <p>{t("surcharge")} {priceInVn(route.price_add_holiday)} {t("during_holidays")}</p>
                                                </div>
                                            ) : null}
                                            <div style={{ paddingTop: "20px" }}>
                                                <p style={{ fontSize: "12px", color: "#999" }}>{t('service_provice_by')}{' '}{route.company_name}</p>
                                            </div>
                                        </Card>
                                        <Affix offsetTop={10}>
                                            <Card className="t-b-box-shadow mt-4">
                                                <div className="t-b-price">
                                                    <p>
                                                        <span>{t('base_pare')}</span>
                                                        <span className="base-pare" >{priceInVn(price)}</span>
                                                    </p>
                                                    {promotion ?
                                                        <p>
                                                            <span>{t('promotion')}</span>
                                                            <span className="base-pare" >-{priceInVn(promotion)}</span>
                                                        </p>
                                                        : null}
                                                    {coupon ?
                                                        <p>
                                                            <span>{t('discount')}</span>
                                                            <span className="base-pare" >-{(price - promotion) < coupon.amount ? priceInVn(price - promotion) : priceInVn(coupon.amount)}</span>
                                                        </p>
                                                        : null}
                                                    <p>
                                                        <span>{t('total')}</span>
                                                        {coupon ? <span className="total-pare">{priceInVn(price - promotion - coupon.amount)}</span> : <span className="total-pare">{priceInVn(price - promotion)}</span>}
                                                    </p>
                                                </div>
                                                <div className="t-b-cancel-h">
                                                    <p>{t('free_cancellation')}{' '}{route.cancel_hour_policy}{' '}{t('hour')}{' '}{t('before_your_pick_up_time')}</p>
                                                </div>
                                            </Card>
                                        </Affix>
                                    </Col>
                                    : null}
                            </Row>
                            :
                            <Result
                                status="warning"
                                title="There are some problems with your operation."
                            />
                    }
                </div>
            </div>
        </AppLayout>
    )
}

export default withTranslation('transport')(TransportBooking);