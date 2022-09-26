import MyTag from './MyTag';
import PropTypes from "prop-types";
import React from 'react'


class CheckboxTag extends React.Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        className: PropTypes.string,
        onChange: PropTypes.func,
        style: PropTypes.object,
        value: PropTypes.array
    };

    static defaultProps = {
        data: [],
        className: "",
        style: {},
        onChange: () => { },
        value: []
    };



    onChangeItem = (value) => {
        this.props.onChange(value)
    }

    setDefaultItem(item, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (item.value.toString() === arr[i].toString()) return true;
        }
        return false;
    }

    render() {
        const { data, className, onChange, style, value } = this.props;
        return (
            <React.Fragment>
                {data.map(item => {
                    return (
                        <MyTag key={item.value} checked={this.setDefaultItem(item, value)} onChange={this.onChangeItem} value={item.value}>{item.display}</MyTag>
                    )
                })}
            </React.Fragment>
        );
    }
}

export default CheckboxTag;

