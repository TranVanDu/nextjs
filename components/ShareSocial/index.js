import React, { useState, useEffect } from 'react';
import { withTranslation } from '../../i18n';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function ShareSocial(props) {
    const { t, link_share } = props;
    const [copied, setCopied] = useState(false);
    const zaloIcon = require('../../public/static/images/zalo.png');

    const loadZaloScript = () => {
        const existingScript = document.getElementById('zalo');

        if (existingScript) {
            existingScript.remove();
        }
        const script = document.createElement('script');
        script.src = 'https://sp.zalo.me/plugins/sdk.js';
        script.id = 'zalo';
        document.body.appendChild(script);
    };

    useEffect(() => {
        loadZaloScript();
    }, [link_share]);

    var URLMessenger = `https://www.facebook.com/dialog/send?app_id=542477432970123&` + `link=${link_share}` + `&redirect_uri=${link_share}`
    // console.log("link_share", link_share)
    return (

        <div className="share-social d-flex align-items-center">
            <div className="mr-3">
                <TwitterShareButton className="share-twitter d-flex align-items-center" url={link_share}>
                    <TwitterIcon size={45} />
                    <span className="d-none d-lg-block">Twitter</span>
                </TwitterShareButton>
            </div>
            <div className="mr-3">
                <FacebookShareButton className="share-face d-flex align-items-center" url={link_share}>
                    <FacebookIcon size={45} />
                    <span className="d-none d-lg-block">Facebook</span>
                </FacebookShareButton>
            </div>
            <div className="mr-3">
                <a href={URLMessenger} target="blank" className="d-flex align-items-center">
                    <FontAwesomeIcon className="icon-messenger" icon={['fab', 'facebook-messenger']} width="22px" /> <span className="d-none d-lg-block">Messenger</span>
                </a>
            </div>
            <div dangerouslySetInnerHTML={{
                __html: `
                    <div class="zalo-share-button" data-href="${link_share}" data-oaid="579745863508352884" data-layout="2" data-color="blue" data-customize=true>
                        <div class="d-flex align-items-center share-zalo">
                            <img src="${zaloIcon}" />
                            <span class="d-none d-lg-block">Zalo</span>
                        </div>
                    </div>
                `
            }}></div>
            {/* <div>
                <div className="zalo-share-button" data-href={link_share} data-oaid="579745863508352884" data-layout="2" data-color="blue" data-customize={true}>
                    <div className="d-flex align-items-center share-zalo">
                        <img src={require('../../public/static/images/zalo.png')} />
                        <span className="d-none d-lg-block">Zalo</span>
                    </div>
                </div>
            </div> */}
        </div>

    )
}

export default withTranslation('user_task')(ShareSocial);