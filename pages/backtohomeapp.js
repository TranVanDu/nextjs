import React, { Component } from 'react';
import Head from 'next/head';
import { Layout, Spin } from 'antd';



const { Content } = Layout;

export default class List extends Component {


    render() {
        return (
            <div>
                <Head>
                    <title>Gopanda</title>
                    <link rel="icon" href="/logo-icon.jpg" />
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>
                    <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                    <meta name="author" content="Gopanda" />
                    <meta name="description" content="Gopanda is a licensed service for foreign travelers wishing to travel China. With the growth and expansion of this in-bound travel business, Gopanda was formed to take this cultural experience to the Australia & North America by organizing fully escorted and in-depth tours of China." />
                    <meta name="keywords" content="gopanda, booking travel" />

                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://gopanda.asia" />
                    <meta property="og:title" content="Gopanda"/>
                    <meta property="og:description" content="Gopanda is a licensed service for foreign travelers wishing to travel China. With the growth and expansion of this in-bound travel business, Gopanda was formed to take this cultural experience to the Australia & North America by organizing fully escorted and in-depth tours of China." />
                    <meta property="og:image" content={"https://app.gopanda.asia/public/logo-share2.png"} />
                    
                </Head>

                <Layout>

                    <Content>
                        <div className="container" style={{ height: "100vh", margin: "auto", alignItems: "center", backgroundColor: "#ffff", display: "flex" }} >
                            <div style={{ width: "100%", textAlign: "center" }}><Spin /></div>
                        </div>
                    </Content>

                </Layout>
            </div>
        )
    }
}
