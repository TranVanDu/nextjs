import React from 'react';
import PropsType from 'prop-types';
import { Tag, Typography } from 'antd';
import renderHTML from 'react-render-html';

const { Title } = Typography;

const BlogItem = (props) => {
    let { title, image, url, isTitleOverImage, categories } = props;

    return (
        <a className="home-blog-item" href={url} target="_blank">
            <div
                className="blog-item-image d-flex"
                style={{
                    backgroundImage: isTitleOverImage ? `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)), url("${image}")` : `url("${image}")`
                }}
            >
                {
                    isTitleOverImage ? (
                        <div className="align-self-end ml-4 mb-3">
                            <Title className="blog-item-inner-title" level={5}>{renderHTML(title)}</Title>
                            {
                                categories.map(category => (
                                    <Tag key={category.term_id} className="blog-item-category">{category.name}</Tag>
                                ))
                            }
                        </div>
                    ) : null
                }
            </div>
            {
                !isTitleOverImage ? (
                    <div>
                        <Title className="blog-item-outer-title" level={5}>{renderHTML(title)}</Title>
                        <div className="blog-item-outer-categories">
                            {
                                categories.map(category => (
                                    <Tag key={category.term_id} className="blog-item-category">{category.name}</Tag>
                                ))
                            }
                        </div>
                    </div>
                ) : null
            }
        </a>

    )
}

BlogItem.propTypes = {
    title: PropsType.string,
    image: PropsType.string,
    url: PropsType.string,
    isTitleOverImage: PropsType.bool,
    categories: PropsType.array
}

BlogItem.defaultProps = {
    url: '#',
    isTitleOverImage: true,
    categories: []
}

export default BlogItem;