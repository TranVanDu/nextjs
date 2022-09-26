import React, { Component } from 'react';
import PropTypes from "prop-types";
/**
 * Component that alerts if you click outside of it
 */
export default class OutsideClicker extends Component {

    static defaultProps = {
        outClick: () => { }
    };

    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            if (event.target.className == "global-search-item-desc" || event.target.className == "global-search-item") { }
            else this.props.outClick();
        }
    }

    render() {
        return <div className="tuan-dat" ref={this.setWrapperRef}>{this.props.children}</div>;
    }
}

OutsideClicker.propTypes = {
    children: PropTypes.element.isRequired,
    outClick: PropTypes.func
};