import App from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { appWithTranslation, i18n } from '../i18n';
import 'react-dates/lib/css/_datepicker.css';
//import fontawesome icon
// import "../public/static/css/animate.css";
// import "../public/static/css/style.css";
// import "../public/static/css/custom.css";
// import "../public/static/less/_date_picker.less";
import "../public/static/less/styles.less";
import "../public/static/less/dev_tien.less";
import "../public/static/less/dev_thu.less";
import "../public/static/less/dev_hien.less";
import "../public/static/less/dev_dat.less";

// locale
import moment from 'moment';
import localeVi from 'antd/lib/locale/vi_VN';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { fal } from '@fortawesome/pro-light-svg-icons';
// import { fas } from '@fortawesome/pro-solid-svg-icons';
// import { far } from '@fortawesome/pro-regular-svg-icons';
// import { fad } from '@fortawesome/pro-duotone-svg-icons';

library.add(fab, fas);

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    const validateMessages = {
      required: i18n.language == 'en' ? 'Required' : 'Bắt buộc',
    };

    // change moment language
    moment.locale(i18n.language);

    return (
      <Provider store={reduxStore}>
        <ConfigProvider locale={i18n.language == 'en' ? null : localeVi} form={{ validateMessages }}>
          <Component {...pageProps} />
        </ConfigProvider>
      </Provider>
    )
  }
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  return { ...appProps }
}

export default appWithTranslation(withReduxStore(MyApp));
