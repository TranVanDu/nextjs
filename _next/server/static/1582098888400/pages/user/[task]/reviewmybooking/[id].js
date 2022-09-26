module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/jkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string


const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.default = withRouter;

var _extends2 = _interopRequireDefault(__webpack_require__("htGi"));

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router = __webpack_require__("nOHt");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, (0, _extends2.default)({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (false) { var name; }

  return WithRouterWrapper;
}

/***/ }),

/***/ "0c6W":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAllWishList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getMyBooking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return removeMyWishList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return updateUserInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getMyReview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getdetailOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createReviewMyBooking; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hfKm");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2Eek");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("XoMD");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Jo+v");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4mXO");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("pLtp");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vYYK");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("bMwp");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("Zfxy");
/* harmony import */ var _components_NotificationElement_NotiSuccess__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("PgMR");
/* harmony import */ var _components_NotificationElement_NotiError__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("isjx");
/* harmony import */ var _components_NotificationElement_ModalSuccess__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("TFtM");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("eW3l");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_13__);









function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }







const getAllWishList = id => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].get(`/tour/mywishlist?user_id=${id}`).then(res => {
      resolve(res.data);
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_9__[/* GET_MY_WISH_LIST */ "h"],
        payload: res.data.data
      });
    }).catch(error => {
      reject(error.response.data);
      NotificationManager.error(error.response.data.msg);
    });
  });
};
const getMyBooking = id => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].get(`/booking/list/${id}`).then(res => {
      resolve(res.data);
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_9__[/* GET_MY_BOOKING */ "f"],
        payload: res.data.data
      });
    }).catch(error => {
      reject(error.response);
      console.log(error.response);
    });
  });
};
const removeMyWishList = ids => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].post("/tour/removewishlist", ids).then(res => {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_9__[/* REMOVE_MY_WISH_LIST */ "l"],
        payload: ids.tour_id
      });
      Object(_components_NotificationElement_ModalSuccess__WEBPACK_IMPORTED_MODULE_12__[/* ModalSuccess */ "a"])("Remove successfully");
      resolve(res.data);
    }).catch(error => {
      reject(error);
    });
  });
};
const updateUserInformation = id => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].post("/customer/save", id).then(res => {
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_9__[/* UPDATE_USER_INFORMATION */ "m"],
        payload: res.data.data
      });
      resolve(res.data);
      console.log('res', res.data.data);
      Object(_components_NotificationElement_NotiSuccess__WEBPACK_IMPORTED_MODULE_10__[/* NotiSuccess */ "a"])("Update information success");
    }).catch(error => {
      reject(error.response);
      console.log(error.response);
      Object(_components_NotificationElement_NotiError__WEBPACK_IMPORTED_MODULE_11__[/* NotiError */ "a"])("Update information error");
    });
  });
};
const getMyReview = (filter = {}, type) => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].get(`/review/myreview/${type}`, {
      params: _objectSpread({}, filter),
      paramsSerializer: params => {
        return qs__WEBPACK_IMPORTED_MODULE_13___default.a.stringify(params, {
          arrayFormat: "repeat"
        });
      }
    }).then(res => {
      // dispatch({ type: GET_MY_REVIEW, payload: res.data.data });
      resolve(res.data.data);
    }).catch(error => {
      reject(error.response);
    });
  });
};
const getdetailOrder = id => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].get(`/booking/detail/${id}`).then(res => {
      resolve(res.data.data);
    }).catch(error => {
      reject(error.response.data);
    });
  });
};
const createReviewMyBooking = data => {
  console.log('data', data);
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].post('/review/createReview', data).then(res => {
      resolve(res.data.data);
      console.log('res', res.data.data);
    }).catch(error => {
      reject(error.response.data);
      console.log('err', error.response.data);
    });
  });
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("GhD0");


/***/ }),

/***/ "1tAA":
/***/ (function(module, exports) {

module.exports = "/_next/static/images/logo-c75ab2a55438a1fbd62ba023fd9d97d3.svg";

/***/ }),

/***/ "2Eek":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ltjX");

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "4mXO":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("k1wZ");

/***/ }),

/***/ "5/OU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vYYK");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _actions_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("iuBY");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("rOcY");

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;









const {
  Header
} = antd__WEBPACK_IMPORTED_MODULE_2__["Layout"];
const {
  Option
} = antd__WEBPACK_IMPORTED_MODULE_2__["Select"];
const {
  URL_ASSET
} = _config__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"];

function handleChange(value) {
  console.log(`selected ${value}`);
}

class Headers extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(...args) {
    super(...args);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "menu", __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"], {
      className: "menu-account-login"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer",
      onClick: () => this.props.router.push({
        pathname: '/user/[task]',
        query: {
          task: "dashboard"
        }
      }, '/user/dashboard')
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "layout"
    }), " Dashboard")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer",
      onClick: () => this.props.router.push({
        pathname: '/user/[task]',
        query: {
          task: "setting"
        }
      }, '/user/setting')
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "setting"
    }), " Profile")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer",
      onClick: () => this.props.router.push({
        pathname: '/user/[task]',
        query: {
          task: "bookings"
        }
      }, '/user/bookings')
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "schedule"
    }), " Bookings")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer",
      onClick: () => this.props.router.push({
        pathname: '/user/[task]',
        query: {
          task: "reviews"
        }
      }, '/user/reviews')
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "message"
    }), " Reviews")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "gift"
    }), " Earn Rewards")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer",
      onClick: () => this.props.router.push({
        pathname: '/user/[task]',
        query: {
          task: "wishlist"
        }
      }, '/user/wishlist')
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "heart"
    }), " Wish List")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "percentage"
    }), " Promo Codes")), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, null, __jsx("a", {
      rel: "noopener noreferrer",
      onClick: () => this.props.logout()
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      type: "logout"
    }), " Log Out"))));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "clickBtnAcc", () => {
      this.props.router.push({
        pathname: '/user/[task]',
        query: {
          task: "dashboard"
        }
      }, '/user/dashboard');
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "onClickDes", () => {
      next_router__WEBPACK_IMPORTED_MODULE_4___default.a.push({
        pathname: '/destination'
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "onClickHome", () => {
      next_router__WEBPACK_IMPORTED_MODULE_4___default.a.push({
        pathname: '/'
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "ClickLogin", () => {
      next_router__WEBPACK_IMPORTED_MODULE_4___default.a.push({
        pathname: '/login'
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "clickSignup", () => {
      next_router__WEBPACK_IMPORTED_MODULE_4___default.a.push({
        pathname: '/registration'
      });
    });
  }

  componentDidMount() {
    this.props.loginByToken();
  }

  render() {
    const account = this.props.user;
    return (// <Header style={{ position: 'fixed', zIndex: 2, width: '100%' }}>
      __jsx(Header, null, __jsx("div", {
        className: "container"
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Row"], null, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        xs: 12,
        md: 6,
        lg: 6
      }, __jsx("div", {
        className: "logo"
      }, __jsx("a", {
        style: {
          cursor: "pointer"
        },
        onClick: () => this.onClickHome()
      }, __jsx("img", {
        src: __webpack_require__("1tAA"),
        alt: "GOPANDA"
      })))), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        xs: 12,
        md: 18,
        lg: 18,
        className: "text-right d-none d-md-block"
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"], {
        className: "ct-menu-home",
        mode: "horizontal"
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Menu"].Item, {
        key: "destinations"
      }, __jsx("a", {
        onClick: () => this.onClickDes()
      }, "Destinations"))), __jsx("div", {
        className: "account-language d-inline"
      }, __jsx("div", {
        className: "ct-account"
      }, account ? __jsx("div", {
        className: "after-login"
      }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Dropdown"], {
        overlay: this.menu,
        placement: "bottomRight"
      }, __jsx("div", {
        className: "ant-dropdown-link",
        onClick: this.clickBtnAcc
      }, __jsx("img", {
        className: "avarta-login",
        src: account.image ? URL_ASSET + account.image : URL_ASSET + "/backup.png",
        alt: ""
      }), " ", __jsx("span", null, account.firstname ? account.firstname : "Gopanda User")))) : __jsx("div", {
        className: "before-login"
      }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
        href: "/login"
      }, __jsx("a", {
        className: "ct-btn-account btn-login"
      }, "Log in")), __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {
        href: "/registration"
      }, __jsx("a", {
        className: "ct-btn-account btn-singup"
      }, "Sign up")))))))))
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    loginByToken: () => dispatch(Object(_actions_auth__WEBPACK_IMPORTED_MODULE_6__[/* loginByToken */ "g"])()),
    logout: () => dispatch(Object(_actions_auth__WEBPACK_IMPORTED_MODULE_6__[/* logout */ "h"])())
  };
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(Object(next_router__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(Headers)));

/***/ }),

/***/ "5Uuq":
/***/ (function(module, exports, __webpack_require__) {

var _Object$getOwnPropertyDescriptor = __webpack_require__("Jo+v");

var _Object$defineProperty = __webpack_require__("hfKm");

var _WeakMap = __webpack_require__("G4HQ");

function _getRequireWildcardCache() {
  if (typeof _WeakMap !== "function") return null;
  var cache = new _WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};

  if (obj != null) {
    var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor;

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null;

        if (desc && (desc.get || desc.set)) {
          _Object$defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "6zHJ":
/***/ (function(module, exports) {



/***/ }),

/***/ "Exp3":
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "G4HQ":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("lhFH");

/***/ }),

/***/ "GhD0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hfKm");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2Eek");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("XoMD");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Jo+v");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4mXO");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("pLtp");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vYYK");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("xnum");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_headers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("5/OU");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("TpwP");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _assets_css_animate_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("Nz+5");
/* harmony import */ var _assets_css_animate_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_assets_css_animate_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _assets_css_custom_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("N7Rv");
/* harmony import */ var _assets_css_custom_css__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_assets_css_custom_css__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("6zHJ");
/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_assets_css_style_css__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _actions_user__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("0c6W");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("rOcY");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("wy2R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("h74D");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("hAPS");








var __jsx = react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(Object(source)).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }





 // import "../../../../../public/static/css/bootstrap.min.css";











const TOUR_URL = _config__WEBPACK_IMPORTED_MODULE_18__[/* default */ "a"].URL_ASSET;
const {
  TabPane
} = antd__WEBPACK_IMPORTED_MODULE_15__["Tabs"];
const {
  TextArea
} = antd__WEBPACK_IMPORTED_MODULE_15__["Input"];
const {
  Content
} = antd__WEBPACK_IMPORTED_MODULE_15__["Layout"];
const {
  Title
} = antd__WEBPACK_IMPORTED_MODULE_15__["Typography"]; // const props = {
//     name: 'file',
//     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     headers: {
//         authorization: 'authorization-text',
//     },
//     onChange(info) {
//         if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//         }
//     },
// };

function getBase64(file) {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_7___default.a((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });
}

const dummyRequest = ({
  file,
  onSuccess
}) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 10);
};

const uploadButton = __jsx("div", null, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Icon"], {
  type: "plus"
}), __jsx("div", {
  className: "ant-upload-text"
}, "My files"));

class ReviewMyBooking extends react__WEBPACK_IMPORTED_MODULE_8__["Component"] {
  constructor(...args) {
    super(...args);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "state", {
      detailOrder: {},
      rank: 0,
      comment: '',
      fileList: [],
      order_id: '',
      sub_id: '',
      previewVisible: false,
      previewImage: ''
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "handleChangeRank", value => {
      this.setState(_objectSpread({}, this.state, {
        rank: value
      }));
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "handleSubmit", e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          var review = _objectSpread({}, values);

          review.rank = this.state.rank;
          review.images = this.state.fileResult;
          review.order_id = this.state.order_id;
          review.sub_id = this.state.sub_id;
          Object(_actions_user__WEBPACK_IMPORTED_MODULE_17__[/* createReviewMyBooking */ "a"])(review).then(() => next_router__WEBPACK_IMPORTED_MODULE_16___default.a.push({
            pathname: '/user/[task]',
            query: {
              task: "reviews"
            }
          }, '/user/reviews'));
        }
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "handleCancel", () => this.setState({
      previewVisible: false
    }));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "handlePreview", async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "onRemove", async file => {
      let newFile = [...this.state.fileList];
      newFile = newFile.filter(item => item.uid !== file.uid);
      this.setState(_objectSpread({}, this.state, {
        fileList: newFile
      }));
      let data = await this.setData(newFile); // this.props.onChangeData(data);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(this, "handleChange", async ({
      fileList
    }) => {
      let data = await this.setData(fileList);
      let result = data.map(i => {
        let arr = i.data.split(",");
        let imgSrc = arr[1];
        return imgSrc;
      });
      this.setState(_objectSpread({}, this.state, {
        fileList: fileList,
        fileResult: result
      }));
    });
  }

  componentDidMount() {
    Object(_actions_user__WEBPACK_IMPORTED_MODULE_17__[/* getdetailOrder */ "e"])(next_router__WEBPACK_IMPORTED_MODULE_16___default.a.query.id).then(res => this.setState({
      detailOrder: res,
      order_id: res.id,
      sub_id: res.tour_id
    }));
  }

  async setData(list) {
    let listData = [];

    if (list.length) {
      for (let i = 0; i < list.length; i++) {
        let data = await getBase64(list[i].originFileObj);
        listData.push({
          data: data,
          name: list[i].originFileObj.name
        });
      }
    }

    console.log(listData);
    return listData;
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    const {
      detailOrder
    } = this.state;
    const {
      previewVisible,
      previewImage,
      fileList
    } = this.state;
    console.log('tien', this.state);
    return __jsx("div", null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_9___default.a, null, __jsx("title", null, "ReviewMyBooking"), __jsx("link", {
      rel: "icon",
      href: "/logo-icon.jpg"
    }), __jsx("link", {
      rel: "stylesheet",
      href: "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
      integrity: "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr",
      crossOrigin: "anonymous"
    }), __jsx("link", {
      rel: "stylesheet",
      type: "text/css",
      charSet: "UTF-8",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
    }), __jsx("link", {
      rel: "stylesheet",
      type: "text/css",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
    })), __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Layout"], null, __jsx(_components_headers__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null), __jsx("div", {
      className: "container dashboard"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Layout"], null, __jsx(_components_Sidebar__WEBPACK_IMPORTED_MODULE_21__[/* default */ "a"], {
      account: this.props.user
    }), __jsx(Content, null, __jsx("div", {
      className: "db-content booking pdtop-20"
    }, __jsx("div", {
      className: "my-dashboard"
    }, __jsx("div", {
      className: "db-left"
    }, __jsx(Title, {
      level: 4,
      className: "db-review-title"
    }, "Write review")), __jsx("div", {
      className: "write-review"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Row"], {
      gutter: 16
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Col"], {
      className: "gutter-row",
      sm: 8,
      lg: 6
    }, __jsx("img", {
      src: TOUR_URL + detailOrder.tour_image,
      width: "100%"
    })), __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Col"], {
      className: "pdtop-20",
      sm: 16,
      lg: 18
    }, __jsx("div", null, __jsx("a", {
      href: "#",
      className: "bk-order-detail-title"
    }, detailOrder.tour_title), __jsx("div", {
      className: "bk-content-child mt-1"
    }, __jsx("div", null, "Durations: ", detailOrder.tour_day + " Days" + " " + detailOrder.tour_night + " Nights"), __jsx("div", null, "Departure Date:  ", moment__WEBPACK_IMPORTED_MODULE_19___default()(new Date(detailOrder.depart)).format('ddd, MMM DDD, YYYY')), __jsx("div", null, "Depart City: ", detailOrder.departure_txt))), __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Form"], {
      onSubmit: this.handleSubmit
    }, __jsx("div", {
      className: "rv-content-child rv-content-posting mt-3"
    }, __jsx("div", {
      className: "activity choose-star"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Form"].Item, {
      label: "Activity Rating"
    }, __jsx("span", null, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Rate"], {
      onChange: this.handleChangeRank,
      value: this.state.rank
    })))), __jsx("div", {
      className: "activity mgt-24"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Form"].Item, {
      label: " Activity Review(At least 50 characters)"
    }, getFieldDecorator("comment", {
      rules: [{
        required: true,
        message: "Please input your comment !"
      }, {
        min: 50,
        message: "At least 50 characters"
      }],
      initialValue: ""
    })(__jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Input"].TextArea, {
      rows: 10
    })))), __jsx("div", {
      className: "upload-comment"
    }, "Upload Photos"), __jsx("br", null), __jsx("div", {
      className: ""
    }, __jsx("div", {
      className: "review-upload"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Upload"], {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      listType: "picture-card",
      fileList: fileList,
      onPreview: this.handlePreview,
      onChange: this.handleChange,
      onRemove: this.onRemove,
      onDownload: false,
      accept: "image/*"
    }, uploadButton), __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Modal"], {
      visible: previewVisible,
      footer: null,
      onCancel: this.handleCancel
    }, __jsx("img", {
      alt: "example",
      style: {
        width: '100%'
      },
      src: previewImage
    }))))), __jsx(antd__WEBPACK_IMPORTED_MODULE_15__["Button"], {
      type: "primary",
      htmlType: "submit"
    }, "Send Review"))))))))))));
  }

}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_20__["connect"])(mapStateToProps, null)(antd__WEBPACK_IMPORTED_MODULE_15__["Form"].create({
  name: "review"
})(ReviewMyBooking)));

/***/ }),

/***/ "Jo+v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Z6Kq");

/***/ }),

/***/ "KI45":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "LX0d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("Xql+");

/***/ }),

/***/ "N7Rv":
/***/ (function(module, exports) {



/***/ }),

/***/ "Nz+5":
/***/ (function(module, exports) {



/***/ }),

/***/ "P5f7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function rewriteUrlForNextExport(url) {
  const [pathname, hash] = url.split('#'); // tslint:disable-next-line

  let [path, qs] = pathname.split('?');
  path = path.replace(/\/$/, ''); // Append a trailing slash if this path does not have an extension

  if (!/\.[^/]+\/?$/.test(path)) path += `/`;
  if (qs) path += '?' + qs;
  if (hash) path += '#' + hash;
  return path;
}

exports.rewriteUrlForNextExport = rewriteUrlForNextExport;

/***/ }),

/***/ "PgMR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotiSuccess; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);

const NotiSuccess = (message, description) => {
  antd__WEBPACK_IMPORTED_MODULE_0__["notification"].success({
    message: message,
    description: description
  });
};

/***/ }),

/***/ "QTVn":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptors");

/***/ }),

/***/ "SqZg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("o5io");

/***/ }),

/***/ "TFtM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalSuccess; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);

const ModalSuccess = (title, content, onOk) => {
  antd__WEBPACK_IMPORTED_MODULE_0__["Modal"].success({
    centered: true,
    title: title,
    content: content,
    onOk: onOk ? onOk : () => {}
  });
};

/***/ }),

/***/ "TUA0":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-property");

/***/ }),

/***/ "TpwP":
/***/ (function(module, exports) {



/***/ }),

/***/ "UXZV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("dGr4");

/***/ }),

/***/ "XoMD":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("QTVn");

/***/ }),

/***/ "Xql+":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/map");

/***/ }),

/***/ "YFqc":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cTJO")


/***/ }),

/***/ "YTqd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = (normalizedRoute.replace(/\/$/, '') || '/').replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => (groups[$1 // Un-escape key
  .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
  ] = groupIndex++, $1.indexOf('\\.\\.\\.') === 0 ? '/(.+?)' : '/([^/]+?)'));
  return {
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  };
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "Z6Kq":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-descriptor");

/***/ }),

/***/ "Zfxy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LOAD_BY_CODE */
/* unused harmony export GET_CITY_DETAIL */
/* unused harmony export GET_DESTINATION_DETAIL */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return GET_USER_BY_TOKEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHANGE_PASSWORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return LOGOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return GET_MY_WISH_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return GET_MY_BOOKING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return REMOVE_MY_WISH_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GET_ALL_COUNTRY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return UPDATE_USER_INFORMATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return GET_MY_REVIEW; });
/* unused harmony export CREATE_REVIEW_MY_BOOKING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GET_FILTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return GET_TOUR_BY_DESTID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ALL_DESTINATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GET_AUTOCOMPLETE; });
// widgets
const LOAD_BY_CODE = "LOAD_BY_CODE"; //city

const GET_CITY_DETAIL = "GET_CITY_DETAIL"; //destination

const GET_DESTINATION_DETAIL = "GET_DESTINATION_DETAIL"; //auth

const GET_USER_BY_TOKEN = "GET_USER_BY_TOKEN";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const LOGOUT = "LOGOUT"; // user

const GET_MY_WISH_LIST = "GET_MY_WISH_LIST";
const GET_MY_BOOKING = "GET_MY_BOOKING";
const REMOVE_MY_WISH_LIST = "REMOVE_MY_WISH_LIST";
const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
const UPDATE_USER_INFORMATION = "UPDATE_USER_INFORMATION";
const GET_MY_REVIEW = "GET_MY_REVIEW";
const CREATE_REVIEW_MY_BOOKING = " CREATE_REVIEW_MY_BOOKING"; //tour

const GET_FILTER = "GET_FILTER";
const GET_TOUR_BY_DESTID = "GET_TOUR_BY_DESTID"; // all destination

const ALL_DESTINATION = "ALL_DESTINATION"; //search

const GET_AUTOCOMPLETE = "GET_AUTOCOMPLETE";

/***/ }),

/***/ "aC71":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/promise");

/***/ }),

/***/ "bMwp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("hLRN");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("rOcY");




const api = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create({
  baseURL: _config__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
  }
});
api.interceptors.request.use(function (config) {
  let accessToken = Object(_helpers_cookie__WEBPACK_IMPORTED_MODULE_2__[/* getCookie */ "a"])('token');

  if (accessToken) {
    config.headers.common['Authorization'] = "Bearer " + accessToken;
  }

  return config;
}, function (error) {
  return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.reject(error);
});
api.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {// removeCookie('token')
    // setTimeout(() => {
    //     window.location.reload();
    // }, 1000);
  }

  return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.reject(error);
});
/* harmony default export */ __webpack_exports__["a"] = (api);

/***/ }),

/***/ "bzos":
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "cTJO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("5Uuq");

var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.default = void 0;

var _map = _interopRequireDefault(__webpack_require__("LX0d"));

var _url = __webpack_require__("bzos");

var _react = _interopRequireWildcard(__webpack_require__("cDcd"));

var _propTypes = _interopRequireDefault(__webpack_require__("rf6O"));

var _router = _interopRequireDefault(__webpack_require__("nOHt"));

var _rewriteUrlForExport = __webpack_require__("P5f7");

var _utils = __webpack_require__("g/15");

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new _map.default();
var IntersectionObserver = false ? undefined : null;

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: formatUrl(href),
        as: asHref ? formatUrl(asHref) : asHref
      };
    });

    this.linkClicked = e => {
      // @ts-ignore target exists on currentTarget
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (false) {}

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      this.cleanUpListeners = listenToIntersections(ref, () => {
        this.prefetch();
      });
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch() {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var {
      pathname
    } = window.location;
    var {
      href: parsedHref
    } = this.formatUrls(this.props.href, this.props.as);
    var href = (0, _url.resolve)(pathname, parsedHref);

    _router.default.prefetch(href);
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch();
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) {}

    return _react.default.cloneElement(child, props);
  }

}

Link.propTypes = void 0;

if (false) { var exact, warn; }

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "dGr4":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/assign");

/***/ }),

/***/ "dZ6Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var _Object$create = __webpack_require__("SqZg");

var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = _Object$create(null);

  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "eVuF":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("aC71");

/***/ }),

/***/ "eW3l":
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "elyg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Promise = __webpack_require__("eVuF");

var _Object$assign = __webpack_require__("UXZV");

var _Object$defineProperty = __webpack_require__("hfKm");

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

_Object$defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");

const mitt_1 = __importDefault(__webpack_require__("dZ6Y"));

const utils_1 = __webpack_require__("g/15");

const rewrite_url_for_export_1 = __webpack_require__("P5f7");

const is_dynamic_1 = __webpack_require__("/jkW");

const route_matcher_1 = __webpack_require__("gguc");

const route_regex_1 = __webpack_require__("YTqd");

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription
  }) {
    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.url === this.pathname && e.state.as === this.asPath) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (false) {}

      this.replace(url, as, options);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented
    // @ts-ignore backwards compatibility

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    return rewrite_url_for_export_1.rewriteUrlForNextExport(url);
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = _Object$assign({}, data, {
      Component
    });

    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new _Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.SUPPORTS_PERFORMANCE_USER_TIMING) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      const url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as; // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, as);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (false) {}

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      } // @ts-ignore pathname is always a string


      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const rr = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(rr)(asPathname);

        if (!routeMatch) {
          const error = 'The provided `as` value is incompatible with the `href` value. This is invalid. https://err.sh/zeit/next.js/incompatible-href-as';

          if (false) {} else {
            console.error(error);
          }

          return resolve(false);
        } // Merge params into `query`, overwriting any specified in search


        _Object$assign(query, routeMatch);
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result
      // @ts-ignore pathname is always a string

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, as, options);
        const hash = window.location.hash.substring(1);

        if (false) {} // @ts-ignore pathname is always defined


        this.set(route, pathname, query, as, _Object$assign({}, routeInfo, {
          hash
        }));

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (false) {}

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      // @ts-ignore method should always exist on history
      window.history[method]({
        url,
        as,
        options
      }, null, as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return _Promise.resolve(cachedRouteInfo);
    }

    return new _Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(Component => resolve({
        Component
      }), reject);
    }).then(routeInfo => {
      const {
        Component
      } = routeInfo;

      if (false) {}

      return new _Promise((resolve, reject) => {
        // we provide AppTree later so this needs to be `any`
        this.getInitialProps(Component, {
          pathname,
          query,
          asPath: as
        }).then(props => {
          routeInfo.props = props;
          this.components[route] = routeInfo;
          resolve(routeInfo);
        }, reject);
      });
    }).catch(err => {
      return new _Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR') {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(Component => {
          const routeInfo = {
            Component,
            err
          };
          return new _Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }));
      });
    });
  }

  set(route, pathname, query, as, data) {
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch `page` code, you may wait for the data during `page` rendering.
   * This feature only works in production!
   * @param url of prefetched `page`
   */


  prefetch(url) {
    return new _Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (false) {}

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (false) {} // @ts-ignore pathname is always defined

      const route = toRoute(pathname);
      this.pageLoader.prefetch(route).then(resolve, reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const Component = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return Component;
  }

  async getInitialProps(Component, ctx) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    const {
      Component: App
    } = this.components['/_app'];
    let props;

    if (Component.__NEXT_SPR) {
      let status; // pathname should have leading slash

      let {
        pathname
      } = url_1.parse(ctx.asPath || ctx.pathname);
      pathname = !pathname || pathname === '/' ? '/index' : pathname;
      props = await fetch( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${pathname}.json`).then(res => {
        if (!res.ok) {
          status = res.status;
          throw new Error('failed to load prerender data');
        }

        return res.json();
      }).catch(err => {
        console.error(`Failed to load data`, status, err);
        window.location.href = pathname;
        return new _Promise(() => {});
      });
    } else {
      const AppTree = this._wrapApp(App);

      ctx.AppTree = AppTree;
      props = await utils_1.loadGetInitialProps(App, {
        AppTree,
        Component,
        router: this,
        ctx
      });
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    if (cancelled) {
      const err = new Error('Loading initial props cancelled');
      err.cancelled = true;
      throw err;
    }

    return props;
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

Router.events = mitt_1.default();
exports.default = Router;

/***/ }),

/***/ "g/15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$keys = __webpack_require__("pLtp");

var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__("bzos");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result = null;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn.apply(this, args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  if (false) {} // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (false) {}

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (false) {}

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SUPPORTS_PERFORMANCE = typeof performance !== 'undefined';
exports.SUPPORTS_PERFORMANCE_USER_TIMING = exports.SUPPORTS_PERFORMANCE && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "gguc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$keys = __webpack_require__("pLtp");

var _Object$defineProperty = __webpack_require__("hfKm");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const params = {};

    _Object$keys(groups).forEach(slugName => {
      const m = routeMatch[groups[slugName]];

      if (m !== undefined) {
        params[slugName] = m.indexOf('/') !== -1 ? m.split('/').map(entry => decodeURIComponent(entry)) : decodeURIComponent(m);
      }
    });

    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "hAPS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("rOcY");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("YFqc");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









const {
  URL_ASSET
} = _config__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"];
const {
  SubMenu
} = antd__WEBPACK_IMPORTED_MODULE_1__["Menu"];
const {
  Title
} = antd__WEBPACK_IMPORTED_MODULE_1__["Typography"];
const {
  Sider
} = antd__WEBPACK_IMPORTED_MODULE_1__["Layout"];

class Sidebar extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  onPushMenu(query, as) {
    next_router__WEBPACK_IMPORTED_MODULE_3___default.a.push({
      pathname: '/user/[task]',
      query: {
        task: query
      }
    }, as);
  }

  setName(account) {
    if (account) {
      var name = "";
      if (account.firstname) name = name + " " + account.firstname;
      if (account.lastname) name = name + " " + account.lastname;
      if (name) return name;
      return "Gopanda user";
    }
  }

  render() {
    const {
      account,
      router
    } = this.props;
    var task = "";

    if (router.query) {
      if (router.query.task) task = router.query.task.toString();
    }

    console.log('task', task);
    return __jsx(Sider, {
      breakpoint: "lg",
      collapsedWidth: "0",
      onBreakpoint: broken => {
        console.log(broken);
      },
      onCollapse: (collapsed, type) => {
        console.log(collapsed, type);
      }
    }, __jsx("div", null, __jsx("div", {
      className: "sidebar-db"
    }, __jsx("div", {
      className: "sidebar-img"
    }, __jsx("img", {
      src: account ? account.image ? URL_ASSET + account.image : URL_ASSET + "/backup.png" : URL_ASSET + "/backup.png",
      className: "avatar"
    }), __jsx(Title, {
      level: 3,
      className: "your-name"
    }, this.setName(account)), __jsx(next_link__WEBPACK_IMPORTED_MODULE_4___default.a, {
      href: "/user/[task]",
      as: "/user/setting"
    }, __jsx("a", {
      className: "edit-profile",
      href: "/user/setting"
    }, "Edit profile"))), __jsx("div", {
      className: "table-box"
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      gutter: 16
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      className: "table-box-left",
      span: 12
    }, __jsx("a", {
      href: "#"
    }, __jsx("p", {
      className: "number-table"
    }, "0"), __jsx("p", {
      className: "text-table"
    }, "Promo Codes"))), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      className: "table-box-right",
      span: 12
    }, __jsx("a", {
      href: "#"
    }, __jsx("p", {
      className: "number-table"
    }, "0"), __jsx("p", {
      className: "text-table"
    }, "Credits"))))), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"], {
      theme: "light",
      mode: "inline",
      selectedKeys: task
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      key: "dashboard",
      className: "li-sidebar",
      onClick: () => this.onPushMenu("dashboard", "/user/dashboard")
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "layout"
    }), __jsx("span", {
      className: "nav-text"
    }, "Dashboard")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      key: "setting",
      className: "li-sidebar",
      onClick: () => this.onPushMenu("setting", "/user/setting")
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "setting"
    }), __jsx("span", {
      className: "nav-text"
    }, "Profile")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      key: "bookings",
      className: "li-sidebar",
      onClick: () => this.onPushMenu("bookings", "/user/bookings")
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "schedule"
    }), __jsx("span", {
      className: "nav-text"
    }, "Bookings")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      key: "reviews",
      className: "li-sidebar",
      onClick: () => this.onPushMenu("reviews", "/user/reviews")
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "message"
    }), __jsx("span", {
      className: "nav-text"
    }, "Reviews")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      key: "wishlist",
      className: "li-sidebar",
      onClick: () => this.onPushMenu("wishlist", "/user/wishlist")
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "heart"
    }), __jsx("span", {
      className: "nav-text"
    }, "Wishlist")), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Menu"].Item, {
      key: "changepassword",
      className: "li-sidebar",
      onClick: () => this.onPushMenu("changepassword", "/user/changepassword")
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      type: "sync"
    }), __jsx("span", {
      className: "nav-text"
    }, "Change password"))))));
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Sidebar));

/***/ }),

/***/ "hLRN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return removeCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCookie; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("vmXh");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
// // set cookie
// export function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";path=/";
// }
// // get cookie
// export function getCookie(cname) {
//     // var d = new Date();
//     // return new Promise((resolve, reject) => {
//         var name = cname + "=";
//         var ca = document.cookie.split(';');
//         for(var i = 0; i < ca.length; i++) {
//             var c = ca[i];
//             while (c.charAt(0) == ' ') {
//                 c = c.substring(1);
//             }
//             if (c.indexOf(name) == 0) {
//                 return c.substring(name.length, c.length);
//             }
//         }
//         return "";
//     // })
// }
// // delete cookie
// export function removeCookie(cname) {
//     var cvalue = getCookie(cname);
//     var d = new Date();
//     d.setTime(d.getTime() - (24 * 60 * 60 * 1000)); // reduce 1 day
//     var expires = d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";path=/;"; 
// }

const setCookie = (key, value, expires) => {
  if (false) {}
};
const removeCookie = key => {
  if (false) {}
};
const getCookie = (key, req) => {
  return  false ? undefined : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
  return js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));

  if (!rawCookie) {
    return undefined;
  }

  return rawCookie.split('=')[1];
};

/***/ }),

/***/ "hfKm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("TUA0");

/***/ }),

/***/ "htGi":
/***/ (function(module, exports, __webpack_require__) {

var _Object$assign = __webpack_require__("UXZV");

function _extends() {
  module.exports = _extends = _Object$assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "isjx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotiError; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);

const NotiError = (message, description) => {
  antd__WEBPACK_IMPORTED_MODULE_0__["notification"].error({
    message: message,
    description: description
  });
};

/***/ }),

/***/ "iuBY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return login; });
/* unused harmony export getAccountByToken */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return loginByToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return changePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return checkExistMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return preResetMail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return confirmResetPass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return checkExistPhoneVerify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return checkExistMailVerify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return verifyMailProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return verifyPhoneProfile; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("eVuF");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("bMwp");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Zfxy");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("hLRN");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);






const login = (data, path) => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post(`/${path}`, data).then(res => {
      resolve(res.data);
      Object(_helpers_cookie__WEBPACK_IMPORTED_MODULE_4__[/* setCookie */ "c"])("token", res.data.data.token, 7);
    }).catch(err => {
      reject(err.response);
      console.log(err.response);
    });
  });
};
const getAccountByToken = () => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post('loginWithToken').then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};
const loginByToken = () => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post('loginWithToken').then(res => {
      resolve(res.data);
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__[/* GET_USER_BY_TOKEN */ "j"],
        payload: res.data
      });
    }).catch(err => {
      reject(err.response);
    });
  });
};
const changePassword = data => dispatch => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post('changepwd', data).then(res => {
      resolve(res.data);
      dispatch({
        type: _types__WEBPACK_IMPORTED_MODULE_2__[/* CHANGE_PASSWORD */ "b"],
        payload: res.data
      });
      Object(_helpers_cookie__WEBPACK_IMPORTED_MODULE_4__[/* removeCookie */ "b"])("token");
    }).catch(err => {
      reject(err.response);
    });
  });
};
const logout = () => dispatch => {
  Object(_helpers_cookie__WEBPACK_IMPORTED_MODULE_4__[/* removeCookie */ "b"])("token");
  dispatch({
    type: _types__WEBPACK_IMPORTED_MODULE_2__[/* LOGOUT */ "k"]
  });
  next_router__WEBPACK_IMPORTED_MODULE_5___default.a.push("/");
};
const checkExistMail = mail => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post('auth/existaccount', {
      email: mail
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};
const preResetMail = data => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post('pre_resetpwd', data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};
const confirmResetPass = data => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post('confirm_resetpwd', data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};
const checkExistPhoneVerify = (data, id) => {
  console.log(data, id);
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post(`/verify_phone/phone_valid/${id}`, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
      console.log("err", err.response);
    });
  });
};
const checkExistMailVerify = (data, id) => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post(`/verify/mail_valid/${id}`, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};
const verifyMailProfile = (data, id) => {
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post(`/verify_email/${id}`, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};
const verifyPhoneProfile = (data, id) => {
  console.log(data, id);
  return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a((resolve, reject) => {
    _api__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].post(`/verify_phone/${id}`, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    });
  });
};

/***/ }),

/***/ "k1wZ":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/get-own-property-symbols");

/***/ }),

/***/ "lhFH":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/weak-map");

/***/ }),

/***/ "ltjX":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/define-properties");

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("5Uuq");

var _interopRequireDefault = __webpack_require__("KI45");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("htGi"));

var _defineProperty = _interopRequireDefault(__webpack_require__("hfKm"));

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _router2 = _interopRequireWildcard(__webpack_require__("elyg"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__("qOIg");

var _withRouter = _interopRequireDefault(__webpack_require__("0Bsm"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

(0, _defineProperty.default)(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty.default)(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = (0, _extends2.default)({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "o5io":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/create");

/***/ }),

/***/ "pLtp":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("qJj/");

/***/ }),

/***/ "qJj/":
/***/ (function(module, exports) {

module.exports = require("core-js/library/fn/object/keys");

/***/ }),

/***/ "qOIg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Object$defineProperty = __webpack_require__("hfKm");

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

_Object$defineProperty(exports, "__esModule", {
  value: true
});

const React = __importStar(__webpack_require__("cDcd"));

exports.RouterContext = React.createContext(null);

/***/ }),

/***/ "rOcY":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const config = {
  API_URL: 'https://app.gopanda.asia/api/',
  URL_ASSET: 'https://app.gopanda.asia/public',
  KEY_IPAPI: '35d5e0c549f370a800038540407eb68d'
};
/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ "rf6O":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "vYYK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hfKm");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "xnum":
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });