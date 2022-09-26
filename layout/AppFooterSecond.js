import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, List, Input, Divider } from 'antd';
import { withTranslation, Link } from '../i18n';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/pro-regular-svg-icons';
import { subscribeNews } from '../requests/stay';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const AppFooterSecond = (props) => {
	var { t } = props;

	const config = useSelector((state) => state.config);

	const footerFirstBlockContent = [
		{ url: 'https://2stay.vn/blog/dat-cho-nhu-the-nao/', label: t('how_to_book') },
		{ url: 'https://2stay.vn/blog/ve-chung-toi/', label: t('about_us') },
		{ url: 'https://2stay.vn/blog/co-hoi-nghe-nghiep/', label: t('career_opportunities') },
		{ url: 'https://2stay.vn/blog/tro-giup/', label: t('help') },
		{ url: 'https://2stay.vn/blog/', label: t('blog') },
		{ url: '/contact', label: t('contact') },
	];
	const footerSecondBlockContent = [
		{ url: '/?task=stay', label: t('hotel') },
		{ url: '/?task=flight', label: t('air_ticket') },
		{ url: '/?task=transport', label: t('transport') },
		{ url: 'https://2stay.vn/blog/nha-hang/', label: t('restaurant') },
		{ url: 'https://2stay.vn/blog/category/combo-du-lich/', label: t('combo_travel_tour') },
		{ url: 'https://2stay.vn/blog/dich-vu-khac', label: t('other_services') },
	];
	const footerThirdBlockContent = [
		{ url: 'https://2stay.vn/blog/dieu-khoan-su-dung/', label: t('term_of_use') },
		{ url: 'https://2stay.vn/blog/quy-che-hoat-dong/', label: t('operating_regulations') },
		{ url: 'https://2stay.vn/blog/chinh-sach-bao-mat/', label: t('privacy_policy') },
		{ url: 'https://2stay.vn/blog/giai-quyet-khieu-nai', label: t('complaints') },
		{ url: 'https://2stay.vn/blog/truyen-thong/', label: t('communication') },
		{ url: 'https://2stay.vn/blog/hop-tac/', label: t('become_a_partner') },
	];
	const footerFourthBlockContent = [
		{ icon: faMapMarkerAlt, label: t('address') },
		{ icon: faEnvelope, label: config.cs_email },
		{ icon: faPhone, label: config.hotline },
	];
	const socialElements = [
		{
			url: 'https://www.facebook.com/2Stay-103520545126329',
			icon: require('../public/static/images/facebook.png'),
			color: '#fff',
			label: t('facebook'),
		},
		{
			url: 'https://www.youtube.com/channel/UCMXmIlB4LeURLjURGHX7uWQ',
			icon: require('../public/static/images/youtube.png'),
			color: '#fff',
			label: t('youtube'),
		},
		{
			url: 'https://www.instagram.com/2stayvn/',
			icon: require('../public/static/images/instagram.png'),
			color: '#fff',
			label: t('instagram'),
		},
		{ url: '#', icon: require('../public/static/images/tiktok.png'), color: '#fff', label: t('tiktok') },
		{
			url: 'https://twitter.com/2Stay2Stay',
			icon: require('../public/static/images/twitter.png'),
			color: '#fff',
			label: t('twitter'),
		},
	];

	const [email, setEmail] = useState('');
	const [isSent, setIsSent] = useState(false);
	const [sending, setSending] = useState(false);

	return (
		<div id="app_footer">
			<div className="container mb-4">
				<div className="mt-4">
					<Row>
						<Col md={16} sm={24} xs={24}>
							<Row>
								<Col md={6} xs={24}>
									<Title level={5}>{t('about_2stay')}</Title>
									<List
										dataSource={footerFirstBlockContent}
										renderItem={(item) => (
											<div>
												<Link href={item.url}>{item.label}</Link>
											</div>
										)}
									></List>
								</Col>
								<Col md={5} xs={24} className="mt-3 mt-md-0">
									<Title level={5}>{t('our_products')}</Title>
									<List
										dataSource={footerSecondBlockContent}
										renderItem={(item) => (
											<div>
												<Link href={item.url}>{item.label}</Link>
											</div>
										)}
									></List>
								</Col>
								<Col md={7} xs={24} className="mt-3 mt-md-0">
									<Title level={5}>{t('others')}</Title>
									<List
										dataSource={footerThirdBlockContent}
										renderItem={(item) => (
											<div>
												<Link href={item.url}>{item.label}</Link>
											</div>
										)}
									></List>
								</Col>
								<Col md={6} xs={24} className="mt-3 mt-md-0">
									<Title level={5}>{t('follow_us')}</Title>
									<List
										dataSource={socialElements}
										renderItem={(item) => (
											<div>
												<Link href={item.url}>
													<div>
														<span>
															{/* <FontAwesomeIcon icon={item.icon} className="footer-icon" color={item.color} /> */}
															<img
																src={item.icon}
																className="footer-icon footer-icon--small"
															/>
														</span>
														<Link href={item.url}>{item.label}</Link>
													</div>
												</Link>
											</div>
										)}
									></List>
								</Col>
							</Row>
							<div className="mt-4">
								<Title level={4}>{t('2stay_slogan')}</Title>
								<List
									dataSource={footerFourthBlockContent}
									renderItem={(item) => (
										<Row>
											<Col md={1} sm={2} xs={2}></Col>
											<Col md={23} sm={22} xs={22}>
												{item.label}
											</Col>
										</Row>
									)}
								></List>
							</div>
						</Col>
						<Col md={8} sm={24} xs={24}>
							<div className="text-center">
								<img src={require('../public/static/images/logo.png')} className="footer-logo" />
								<Title level={5}>{t('download_app_now')}</Title>
								<Row align="middle" justify="center">
									<Col>
										<img
											className="img-qr-code"
											src={require('../public/static/images/qr_2stay.png')}
										/>
									</Col>
									<Col className="ml-3">
										<div>
											<Link href="https://apps.apple.com/vn/app/2stay/id1545125113?l=vi">
												<img
													className="img-app mb-3"
													src={require('../public/static/images/app-store.png')}
												/>
											</Link>
										</div>
										<div>
											<Link href="https://play.google.com/store/apps/details?id=com.stay_app">
												<img
													className="img-app"
													src={require('../public/static/images/google-play.png')}
												/>
											</Link>
										</div>
									</Col>
								</Row>
								<div className="mt-2">
									<div className="text-bold text-xs">{t('smart_travel')} </div>
									<div>{t('subscribe_for_next_holiday')}</div>
								</div>

								<Row gutter={5} className="mt-2" justify="center">
									<Col md={18} sm={16} xs={16}>
										<Input
											placeholder={t('your_email')}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
										/>
									</Col>
									<Col md={6} sm={8} xs={8}>
										<Button
											type="primary"
											onClick={(e) => {
												e.preventDefault();
												setSending(true);
												subscribeNews(email).then((res) => {
													setIsSent(true);
													setSending(false);
												});
											}}
											disabled={sending}
											loading={sending}
											style={{ width: '100%' }}
										>
											{t('register')}
										</Button>
									</Col>
								</Row>
								{isSent && (
									<p className="text-center">
										<CheckCircleOutlined style={{ display: 'inline-flex' }} />{' '}
										<span>{t('subscribe_success')}</span>
									</p>
								)}
								<div>
									<img
										className="footer-logo--small mr-2"
										src={require('../public/static/images/logo_bct.png')}
									/>
									<img
										className="footer-logo--small"
										src={require('../public/static/images/logo_bct.png')}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</div>
				{/* <hr /> */}
			</div>
			<div id="app_footer--second">
				<div className="container">
					<div>
						<small>{t('copyright')}</small>
					</div>
					<div>
						<small>{t('business_registration')}</small>
					</div>
					<div>
						<small>{t('copyright_1')}</small>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withTranslation('footer')(AppFooterSecond);
