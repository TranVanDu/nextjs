import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LockOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import { Result, Button, Typography, Spin, Card, Input } from 'antd';
import { withRouter } from 'next/router';
import qs from 'qs';
import { AppLayout } from '../../../layout';
import config from '../../../config';
import jwt_decode from "jwt-decode";
// actions
import { confirmResetPass } from '../../../requests/auth';

class ResetPassword extends Component {
    state = {
        isLoading: false,
        result: ""
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });

        var filter = qs.parse(this.props.router.query);
        var token = filter.token;
        var decoded = jwt_decode(token);

        await this.props.form.validateFields(async (err, values) => {
            if (!err) {
                confirmResetPass({ new_password: values.new_password, uid: decoded.uid }).then(() => {
                    this.setState({ result: "success", isLoading: false });
                }).catch(() => {
                    this.setState({ result: "error", isLoading: false });
                })
            } else {
                this.setState({ isLoading: false });
            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var { isLoading, result } = this.state;

        var filter = qs.parse(this.props.router.query);
        var token = filter.token;
        var decoded = jwt_decode(token);

        if (result == 'success') {
            return (
                <AppLayout>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <Result
                            status="success"
                            title="Mật khẩu của bạn đã được đặt lại!"
                            subTitle="Hãy đăng nhập với mật khẩu mới mà bạn vừa mới đặt lại."
                            extra={[
                                <Button type="primary" onClick={() => this.props.router.push('/')}>Trở về trang chủ</Button>
                            ]}
                        />
                    </div>
                </AppLayout>
            )
        } else if (result == 'error') {
            return (
                <AppLayout>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <Result
                            status="error"
                            title="Đã có lỗi xảy ra"
                            subTitle="Vui lòng tải lại trang và thử lại lần nữa."
                        />
                    </div>
                </AppLayout>
            )
        }

        return (
            <AppLayout>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    {
                        parseInt(Date.now() / 1000) - decoded.time > 60 * 120 ? (
                            <Result
                                status="403"
                                title="403"
                                subTitle="Đã hết thời gian truy cập. Vui lòng thử lại."
                                extra={
                                    <Button type="primary" onClick={() => this.props.router.push('/')}>Trở về trang chủ</Button>
                                }
                            />
                        ) : (
                            <Card className="reset-password-card mt-4 mb-4">
                                <div>
                                    <p>Vui lòng nhập mật khẩu mới của bạn vào ô dưới</p>
                                    <Form onSubmit={(e) => this.onSubmit(e)}>
                                        <Form.Item>
                                            {getFieldDecorator('new_password', {
                                                rules: [{ required: true, message: 'Bắt buộc' }],
                                            })(
                                                <Input
                                                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Nhập mật khẩu mới"
                                                />,
                                            )}
                                        </Form.Item>
                                        <Button className="mt-4" type="primary" htmlType="submit" loading={isLoading}>
                                            Đặt lại mật khẩu
                                            </Button>
                                    </Form>
                                </div>
                            </Card>
                        )
                    }
                </div>
            </AppLayout>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         // confirmResetPass: (data) => dispatch(confirmResetPass(data))
//     }
// }

export default withRouter(Form.create({ name: 'reset-password' })(ResetPassword));