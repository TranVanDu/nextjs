/**
 * Helpers Functions
 */
import moment from "moment";
import config from "../config";
import axios from "axios";
const { KEY_IPAPI } = config;

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
  let time = timestamp * 1000;
  let formatDate = format ? format : "MM-DD-YYYY";
  return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
 */
export function convertDateToTimeStamp(date, format) {
  let formatDate = format ? format : "YYYY-MM-DD";
  return moment(date, formatDate).unix();
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
  let location = url.pathname;
  let path = location.split("/");
  return path[1];
}

// debounce function
export const debounce = (fn, time) => {
  let timeout;

  return function () {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

//get countrycode
export const getCountryFromIp = () => {
  return new Promise((resolve, reject) => {
    return axios.default
      .get(`https://api.ipapi.com/check?access_key=${KEY_IPAPI}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//clean obj
export function cleanObject(obj) {
  Object.keys(obj).map((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });

  return obj;
}

//time zone
export const convertTimezone = (date, format) => {
  var m = moment.utc(date); // parse input as UTC
  return m.clone().local().format(format);
};

//remove html tag
export const getTextFromHtml = (html) => {
  if (!html) return "";
  var text = html.replace(/<\/?[^>]+(>|$)/g, "");
  return text;
};

/**
 * Plane
 */
export function convertPlaneType(planeName, airlineCode) {
  if (airlineCode == "VJ") return "Airbus A321";
  else if (airlineCode == "QH") {
    if (planeName) return planeName;
    else return "Chưa có dữ liệu";
  } else if (airlineCode == "VN") {
    if (planeName == "787") return "Boeing 787";
    else if (planeName == "AT7") return "ATR72";
    else return "Airbus A" + planeName;
  }
}

export const convertClassOfFlightBooking = (code) => {
  // vietnam airlines
  if (["J", "C", "D", "I"].indexOf(code) >= 0) return "Thương gia";
  else if (["U", "Z", "W"].indexOf(code) >= 0) return "Phổ thông đặc biệt";
  else if (["Y", "B", "M", "S"].indexOf(code) >= 0)
    return "Phổ thông linh hoạt";
  else if (["H", "K", "L", "Q", "N", "R"].indexOf(code) >= 0)
    return "Phổ thông tiêu chuẩn";
  else if (["T", "G", "A", "E", "P"].indexOf(code) >= 0)
    return "Phổ thông tiết kiệm";
  // bamboo
  else if (code == "ECONOMYSAVERMAX") return "Economy SaverMAX";
  else if (code == "ECONOMYSAVER") return "Economy Saver";
  else if (code == "ECONOMYSMART") return "Economy Smart";
  else if (code == "ECONOMYFLEX") return "Economy Flex";
  else if (code == "PREMIUMSMART") return "Premium Smart";
  else if (code == "PREMIUMFLEX") return "Premium Flex";
  else if (code == "BUSINESSSMART") return "Business Smart";
  else if (code == "BUSINESSFLEX") return "Business Flex";
  // vietjet
  else if (code == "Eco") return "Economy (Phổ thông)";
  // else if (code = 'Deluxe') return 'Deluxe';
  // else if (code == 'SkyBoss') return 'SkyBoss';
  else if ((code = "Deluxe")) return "Deluxe (Cao cấp)";
  else if (code == "SkyBoss") return "Business (Thương gia)";
};

export const generateAirline = (airlineCode) => {
  switch (airlineCode) {
    case "VN":
      return {
        name: "Vietnam Airlines",
        logo: require("../public/static/images/airlines/vietnam_airline.png"),
      };
    case "VJ":
      return {
        name: "Vietjet Air",
        logo: require("../public/static/images/airlines/vietjet.png"),
      };
    case "QH":
      return {
        name: "Bamboo Airways",
        logo: require("../public/static/images/airlines/bamboo.png"),
      };
  }
};

export const convertTime = (minutes) => {
  var hour = Math.floor(minutes / 60);
  var remainMinutes = minutes - hour * 60;
  if (remainMinutes == 0) return `${hour}h`;
  return `${hour}h${remainMinutes}m`;
};

export const formatThousandNumber = (number) => {
  number = parseInt(number); // convert if number is float
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const renderPrice = (number) => {
  number = formatThousandNumber(number);
  return number.toString() + "đ";
};

export const getIconClass = (amenity) => {
  switch (amenity) {
    case "Wifi":
      return "fas fa-wifi";
    case "Internet":
      return "fab fa-internet-explorer";
    case "TV":
      return "fas fa-tv";
    case "Điều hòa":
      return "fas fa-fan";
    case "Bồn tắm":
      return "fas fa-bath";
    case "Buồng tắm đứng":
      return "fas fa-shower";
    case "Toilet":
      return "fas fa-toilet";
    case "Đèn sưởi nhà tắm":
      return "fas fa-menorah";
    case "Bếp điện/Bếp từ":
      return "fas fa-gas-pump";
    case "Bếp ga":
      return "fas fa-gas-pump";
    case "Coffee shop":
      return "fas fa-coffee";
    case "Gym/Fitness":
      return "fas fa-dumbbell";
    case "Toilet riêng":
      return "fas fa-toilet";
    case "View núi đồi":
      return "fas fa-mountain";
    case "Bồn tắm nằm":
      return "fas fa-hot-tub";
    case "Bữa sáng miễn phí":
      return "fas fa-bacon";
    case "Spa/Massage":
      return "fas fa-spa";
    case "Hội nghị/hội thảo/sự kiện":
      return "fas fa-handshake";
    case "Trung tâm thương mại":
      return "fas fa-store-alt";
    case "Dọn phòng hàng ngày":
      return "fas fa-broom";
    case "Nhà hàng":
      return "fas fa-utensils";
    case "Thang bộ":
      return "fas fa-swimming-pool";
    case "Bàn trang điểm":
      return "fas fa-ring";
    default:
      return "far fa-check-square";
      break;
  }
};

export const priceInVn = (number) => {
  if (number < 0) number = 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const removeVietnameseTones = (str) => {
  const newStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
  return newStr;
};

export function strToAlphaBet(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  // str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}
