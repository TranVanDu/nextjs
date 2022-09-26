import axios from 'axios';

export const getAddressByLatLng = (lat, lng) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAX2PANITOz9OwOu1oaj3QGZGQelGywIyA`).then(res => {
            resolve(res);
        })
            .catch(err => {
                reject(err)
            })
    })
}