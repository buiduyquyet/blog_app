import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Category() {
    const navigate = useNavigate();
    const cat = useLocation().search;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/category${cat}`);
                console.log("Posts Cate: ", res.data)
                setPosts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return (
        <div className="home content">
            <div className="posts">
                {posts?.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <div className="short-content">
                                <p className="desc">{getText(post.desc)}</p>
                            </div>
                            <button onClick={() => navigate(`/post/${post.id}`)}>Read More</button>
                        </div>
                    </div>
                ))}
                {/* <Pagination
                    defaultCurrent={data?.page}
                    defaultPageSize={5}
                    total={data?.totalRow}
                    onChange={(page) => {
                        setCurrentPage(page);
                    }}
                />
                <p>Page: {currentPage}</p> */}
            </div>
        </div>
    )
}
