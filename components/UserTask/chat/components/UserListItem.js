/**
 * User List Item
 */
import React from 'react';
import { textTruncate } from '../../../../helpers/helpers';
import AvatarConversation from './AvataConversation';
import moment from 'moment';
import { Tag, Col, Row } from 'antd';

class UserListItem extends React.Component {

    static defaultProps = {
        user: {}
    }

    setAvtArr() {
        let { user } = this.props;
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
        let { user } = this.props;
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

    setSenderName() {
        let { user, authId } = this.props;
        let n = "";
        let last_message = user.last_message ? user.last_message[0] ? user.last_message[0] : {} : {};
        if (last_message.cid == authId) return "You: "
        n = last_message.firstname || last_message.lastname;
        n = n ? `${n}: ` : "no name: ";
        return n;
    }

    setDate() {
        let { user } = this.props;
        let last_message = user.last_message ? user.last_message[0] ? user.last_message[0] : {} : {};
        let v = last_message.updated_at ? last_message.updated_at : "";
        if (v) {
            var m = moment.utc(v); // parse input as UTC
            if (m.clone().local().format("DD-MM-YYYY") == moment().format("DD-MM-YYYY")) {
                return m.clone().local().fromNow();
            }
            else return m.clone().local().format("DD-MM-YYYY, HH:mm")

        }
        return "";

    }

    render() {


        var { user } = this.props;
        var last_message = user.last_message ? user.last_message[0] ? user.last_message[0] : {} : {};
        var content = last_message.content ? last_message.content : ""

        return (
            <div className="bk-order-af" onClick={() => this.props.onClickListItem()}>
                <div className={user.unread ? "bk-order-number" : "list-inbox-bk-order-number"} style={{ cursor: "pointer" }}>
                    <Row type="flex" align="middle">
                        <Col xs={6} sm={3}>
                            <AvatarConversation data={this.setAvtArr()}></AvatarConversation>
                        </Col>
                        <Col xs={18} sm={21}>
                            <div className="media-body">
                                {
                                    user.unread ?
                                        <React.Fragment>
                                            <h5 className="mb-0" style={{ fontWeight: "bold" }}>{textTruncate(this.setName(), 20)}</h5>
                                            <p className="mb-0"><span className="font-xs d-block" style={{ fontWeight: "bold" }}><span style={{ textTransform: "capitalize" }} >{this.setSenderName()}</span>{textTruncate(content, 50)}</span></p>
                                            <p className="mb-0"><span style={{ textTransform: "capitalize", fontWeight: "bold" }}>Topic: {user.type=== "order" ? user.tour_title: user.type }</span> {this.setDate() ? <span style={{ color: "#c9c9c9", fontWeight: "normal" }}> . {this.setDate()}</span> : null}</p>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <h5 className="mb-0" style={{ fontWeight: "500" }}>{textTruncate(this.setName(), 20)}</h5>
                                            <p className="mb-0"><span className="font-xs d-block" ><span style={{ textTransform: "capitalize" }} >{this.setSenderName()}</span>{textTruncate(content, 50)}</span></p>
                                            <p className="mb-0"><span style={{ textTransform: "capitalize" }}>Topic: {user.type=== "order" ? user.tour_title: user.type }</span>{this.setDate() ? <span style={{ color: "#c9c9c9", fontWeight: "normal" }}> . {this.setDate()}</span> : null}</p>
                                        </React.Fragment>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );

    }
}
export default UserListItem;
