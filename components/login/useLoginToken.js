import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginByToken } from '../../redux/actions/auth';
import { getConfig } from '../../redux/actions/ConfigActions';

export function useLoginToken() {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = useSelector(state => state.auth.user);
    useEffect(() => {
        if (auth) {
            setLoading(false);
            setUser(auth);
        }
        else {
            dispatch(loginByToken()).then(res => {
                setUser(res);
                setLoading(false);
            }).catch(err => {
                setUser(null);
                setLoading(false);
            })
        }
    }, [auth]);
    return { user, loading };
}

export function useGetConfig() {
    const dispatch = useDispatch();
    const [config, setConfig] = useState(null);
    const configRd = useSelector(state => state.config);
    useEffect(() => {
        if (config && config.url_asset_root) {
            setConfig(configRd);
        }
        else {
            dispatch(getConfig()).then(res => {
                setConfig(res);
            }).catch(err => {
                setConfig(null);
            })
        }
    }, []);
    return config;
}
