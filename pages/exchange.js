import React, { useEffect, useState } from 'react';
import { Col, Button, Input, Form, AutoComplete, DatePicker, Skeleton, Row, Card, Typography, Space, List, Avatar, IconText, Divider } from 'antd';
import holidayApi from "../requests/holiday";
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { LikeOutlined, MessageOutlined, StarOutlined, PhoneOutlined, MailOutlined, EyeOutlined } from '@ant-design/icons';
import moment from "moment";
import { AppLayout } from '../layout';
const { Meta } = Card;
const { Title, Text } = Typography;

const { Option } = Select;


const SearchForm = (props) => {
    var { t } = props;
    var formRef = React.createRef();
    const [form] = Form.useForm();
    const [destinations, setDestinations] = useState([]);
    const [properties, setProperties] = useState([]);

    const [item, setItem] = useState({});
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(true);
    const config = useSelector(state => state.config);
    const [modal, setModal] = useState(false);
    const user = useSelector(state => state.auth.authUser);
    const [filter, setFilter] = useState({
        sort: {
            type: "desc",
            attr: "",
        },
        paging: {
            perpage: 20,
            page: 1,
        },
        status: { value: 1 },
        search: "",
        city_id: null,
        month: null
    });


    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    useEffect(() => {

        async function fetchData() {
            //setLoading(true);
            let destinations = await holidayApi.destination();

            destinations.data.map(item => {
                return { label: item.title, value: item.id }
            });

            setDestinations(destinations.data);
            //setLoading(false);

        }
        fetchData();



    }, []);

    useEffect(() => {

        async function fetchData() {
            var tfilter = { ...filter, city_id: "", month: "" };
            await holidayApi.getAll(tfilter).then(res => {

                setLoading(false);
                //console.log('holiday', res.data.list);

                let items = res.data.list;
                items = items.map((item, index) => {

                    let cover_img = item ? typeof (item.cover_img) == 'string' ? item.cover_img : item.cover_img[0] : '';
                    let image = config ? config.url_asset_root + cover_img : `https://picsum.photos/500/900?random=${index}`;
                    let content = moment(item.start_date).format('dd-MM-YYYY');

                    let href = "http://2stay.vn/stay/" + item.property_id;
                    content = "Có sẵn từ " + content + " đến " + moment(item.end_date).format('dd-MM-YYYY');
                    content = content + " - Số đêm: " + item.night;
                    content = content + " - Tại: " + item.district
                    return { ...item, href: href, sup_fullname: `${item.sup_firstname} ${item.sup_lastname}`, content: content, image: image }

                })

                setProperties(items);
                setTotal(items.length);

            });

        }
        fetchData();


    }, [config]);

    console.log('properties', properties);

    const onOpenModal = (record = null) => {
        setItem(record);
        setModal(true);

    }
    const onCloseModal = () => {
        setItem(null);
        setModal(false);
    }

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const onFinish = async (values) => {

        // console.log('values', values);

        setLoading(true);
        try {
            var tfilter = { ...filter, city_id: values.city_id, month: values.month };
            await holidayApi.getAll(tfilter).then(res => {

                setLoading(false);
                //console.log('holiday', res.data.list);

                let items = res.data.list;
                items = items.map((item, index) => {

                    let cover_img = item ? typeof (item.cover_img) == 'string' ? item.cover_img : item.cover_img[0] : '';
                    let image = config ? config.url_asset_root + cover_img : `https://picsum.photos/500/900?random=${index}`;
                    let content = moment(item.start_date).format('dd-MM-YYYY');
                    let href = "http://2stay.vn/stay/" + item.property_id;
                    content = "Có sẵn từ " + content + " đến " + moment(item.end_date).format('dd-MM-YYYY');
                    return { ...item, href: href, sup_fullname: `${item.sup_firstname} ${item.sup_lastname}`, content: content, image: image }

                })

                setProperties(items);
                setTotal(items.length);

            });

        } catch (error) {
            setLoading(false);
        }

    };

    const Content = (props) => {

        const { href, title } = props;

        return (

            <>

                <a href={href} target="_blank">{title}</a>
            </>

        )

    }


    return (

        <AppLayout>
            <div className="container mt-4 pt-4 mb-4">
                <div className="exchange-search">
                    <Form form={form} name="horizontal_login"  onFinish={onFinish} >
                    <Row gutter={[{ md: 16, sm: 0, xs: 0 }, { md: 0, sm: 8, xs: 8 }]}>
                        <Col  md={9} sm={24} xs={24} className="">
                            <Form.Item label="Chọn điểm đến" name="city_id" rules={[{
                                required: true,
                                message: "Cần chọn điểm đến"
                                }]} >
                                <Select style={{ width: 200 }}

                                    showSearch={true}
                                    placeholder="Chọn điểm đến"
                                >

                                    {destinations.map((item, index) => {

                                        return <Option value={item.id} key={index}>{item.title}</Option>
                                    })
                                    }

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={9} sm={24} xs={24} className="">
                            <Form.Item label="Chọn tháng" name="month" >

                                <Select placeholder="Chọn tháng" style={{ width: 200 }}>


                                    <Option value={0} key={10000}>---Chọn tháng---</Option>
                                    {months.map((item, index) => {

                                        return <Option value={item} key={index}>Tháng {item}</Option>
                                    })
                                    }
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col md={6} sm={24} xs={24} className="text-right">
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Tìm kiếm kỳ nghỉ
                            </Button>
                        </Col>
                    
                    </Row>

                    </Form >
                </div>
                
                {!loading ?
                    <Text> Tìm thấy {total} chỗ nghỉ đang có nhu cầu trao đổi</Text> : ""
                }
                <Divider className="mt-1"></Divider>

                {!loading ?
                    <Row>
                        <Col span={24}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                width="100%"
                                pagination={{
                                    onChange: page => {
                                        console.log(page);
                                    },
                                    pageSize: 20,
                                }}
                                dataSource={properties}
                                footer={
                                    <></>
                                }
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                        actions={[

                                            <IconText icon={MessageOutlined} text={item.sup_fullname} key="list-vertical-message" />,
                                            <IconText icon={PhoneOutlined} text={item.sup_mobile} key="list-vertical-message" />,
                                            <IconText icon={MailOutlined} text={item.sup_email} key="list-vertical-message" />,
                                            <a href="https://host.2stay.vn"> <Button type="primary" >Gửi yêu cầu</Button></a>

                                        ]}
                                        extra={
                                            <img
                                                width={272}
                                                alt="logo"
                                                src={item.image}
                                                className="exchange-img"
                                            />
                                        }
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar style={{ backgroundColor: '#f56a00' }} >{item.sup_lastname.charAt(0)}
                                            </Avatar>}
                                            title={<Content title={item.title} href={item.href}></Content>}
                                            description={item.content}
                                        />
                                        {item.description}
                                    </List.Item>
                                )}
                            /></Col>



                    </Row> : <Skeleton active />
                }

            </div>
        </AppLayout>
    )
}

export default (SearchForm);