import React from "react";
import s from './Post.module.css'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

type PostType = {
    message: string,
    likeCount: number
}

const Post:React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <Avatar size={50} icon={<UserOutlined />} className={s.avatar} />
            {props.message}
            <div>
                <span>like {props.likeCount}</span>
            </div>
        </div>
    );
}

export default Post;