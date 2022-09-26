import api from '../utils/api';
import qs from "qs";

class HolidayApi {
    getAll = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api
                    .get("/sup_property/holiday/list", {
                        params: data, paramsSerializer: (params) => {
                            return qs.stringify(params);
                        },
                    });
                console.log('api res', res)
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    };
    create = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api
                    .post("/sup_property/holiday/save", data);

                resolve(res.data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    };

    update = (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api
                    .post(`/sup_property/holiday/update/${id}`, data);

                resolve(res.data);
            } catch (error) {

                reject(error);
            }
        });
    };

    delete = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api
                    .delete(`/sup_property/holiday/delete/${id}`);

                resolve(res.data);
            } catch (error) {

                reject(error);
            }
        });
    };

    deleteMany = (ids) => {

        return new Promise((resolve, reject) => {
            api
                .delete("/sup_property/holiday/delete", { data: ids })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    //NotificationManager.error("Đã có lỗi xảy ra, vui lòng thử lại");
                    reject(error);
                });
        });
    };

    getDetail = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await api
                    .get(`/sup_property/holiday/load/${id}`);

                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    getAllProperties = (filter = {}) => {
        return new Promise((resolve, reject) => {
            api
                .get(`/property_sup/list`, {
                    params: { ...filter },
                    paramsSerializer: (params) => {
                        return qs.stringify(params);
                    },
                })
                .then((res) => {

                    resolve(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    reject(error);

                });
        });
    };


    destination = () => {
        return new Promise((resolve, reject) => {
            api
                .get(`/holiday/destination`)

                .then((res) => {

                    resolve(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    reject(error);

                });
        });
    };

    search = (filter = {}) => {
        return new Promise((resolve, reject) => {
            api
                .get(`/holiday/search`, {
                    params: { ...filter },
                    paramsSerializer: (params) => {
                        return qs.stringify(params);
                    },
                })
                .then((res) => {

                    resolve(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    reject(error);

                });
        });
    };
    book = (filter = {}) => {
        return new Promise((resolve, reject) => {
            api
                .get(`/holiday/book`, {
                    params: { ...filter },
                    paramsSerializer: (params) => {
                        return qs.stringify(params);
                    },
                })
                .then((res) => {

                    resolve(res.data);
                })
                .catch((error) => {
                    console.log(error.response);
                    reject(error);

                });
        });
    };

}
const holidayApi = new HolidayApi();

export default holidayApi;