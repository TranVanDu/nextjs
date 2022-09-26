import cookie from 'js-cookie';

export const setCookie = (key, value, expires) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: expires,
            domain: window.location.hostname
        });
    }
};


export const removeCookie = (key) => {
    if (process.browser) {
        cookie.remove(key, { domain: window.location.hostname });
    }
};


export const getCookie = (key, req) => {
    return process.browser
        ? getCookieFromBrowser(key) : undefined
    // : getCookieFromServer(key, req);
};


const getCookieFromBrowser = key => {
    return cookie.get(key);
};


// const getCookieFromServer = (key, req) => {
//     if (!req.headers.cookie) {
//         return undefined;
//     }
//     const rawCookie = req.headers.cookie
//         .split(';')
//         .find(c => c.trim().startsWith(`${key}=`));
//     if (!rawCookie) {
//         return undefined;
//     }
//     return rawCookie.split('=')[1];
// };