import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";
import './home.scss'

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?page=${currentPage}`);
        setData(res.data);
        setCurrentPage(res.data.page);
        setPosts(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentPage]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="home content ">
      <div className="posts">
        {posts?.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1 className="title-post">{post.title}</h1>
              </Link>
              <div className="short-content">
                <p className="desc">{getText(post.desc)}</p>
              </div>
              <button onClick={() => navigate(`/post/${post.id}`)}>Read More</button>
            </div>
          </div>
        ))}
        <Pagination
          defaultCurrent={data?.page}
          defaultPageSize={5}
          total={data?.totalRow}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
