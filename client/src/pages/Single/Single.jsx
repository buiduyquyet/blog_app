import React, { useEffect, useState } from "react";
import Edit from "../../img/edit.png";
import Delete from "../../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import { message } from "antd";
import './single.scss'

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        // console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      message.success("Xóa bài viết thành công :))")
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent sjdsjdhj
  // }

  return (
    <div className="single content">
      <div className="single-content">
        <img src={`../upload/${post?.img ? post?.img : ''}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>By: {post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {
            currentUser.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=${postId}`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            )
          }
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      {/* {console.log("Single: ", post.cat)} */}
      <Menu cat={post.cat === undefined ? 'art' : post.cat} />
    </div>
  );
};

export default Single;
