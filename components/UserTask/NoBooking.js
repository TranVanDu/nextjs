import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';


class NoBooking extends Component {


    render() {
        const { booking } = this.props;
        return (
            <div className="no-booking">
                
                <FontAwesomeIcon icon={['fal', 'shopping-cart']} />
                
                <div>No upcoming activities... yet! Access your booking history below: <br/>
                    Explore amazing experiences and book seamlessly
                </div>
                <Link href='/'>
                    <a className="go-homepage">Go to Home Page</a>
                </Link>                
            </div>
        )
    }
}

export default NoBooking