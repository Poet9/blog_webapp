import React , { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import emptyIcon from '../img/No_posts_yet.png';
/// fetching blogs cases
import requestTemplate from '../utilities/requestTemplate';
import { useDispatch } from 'react-redux';
import { getBlogs } from '../features/blogs';
const BlogCard = React.lazy(()=>import('./blogCard'));

const fetchBlogsFunc = async (dispatchBlogs, postNumber='') =>{
  requestTemplate(`posts${postNumber}`)
  .then((res) => res.json())
  .then((data)=> dispatchBlogs(getBlogs([data])))
  .catch(e => console.log("error fetching blogs: ", e.message));
}
const getMoreBlogsFunc = (dispatchBlogs , postsNumber, setpostsNumber)=>{
    setpostsNumber(++postsNumber);
    fetchBlogsFunc(dispatchBlogs, `/${postsNumber}`);
}
export default function BlogostsCol(props) {
    const dispatchBlogs = useDispatch();
    const [postsNumber, setpostsNumber] = useState(4);
    const blogs = useSelector(state => state.blogs.value); // get blogs
    useEffect(() => {
        getMoreBlogsFunc(dispatchBlogs, postsNumber, setpostsNumber);
    }, [dispatchBlogs, ])
    
    const appliedFilter = useSelector(state => state.filter.value); // get applied filter
    const DisplayBlogsFunc =()=>{
        if(appliedFilter.blogTitle){
            const searchedBlog = blogs.find((blog, index)=> blog.title === appliedFilter.blogTitle);
            console.log("seearchedblog", searchedBlog); // to be deleted after testing with posts
            return <>
                    <h1 className='my-5 text-light'>RESULTS</h1>
                    {searchedBlog? <BlogCard id={searchedBlog.id} blogData={searchedBlog} />: <h4 className='mb-4 text-light'>No results</h4>}
                </>
        }
        return <>
                <h1 className='my-5 text-light'>TRENDING BLOGS</h1>
                {blogs.length >1?blogs.map((blog, index)=>{
                    if(blog.title?.length >1){
                        if(appliedFilter.filter.length > 1){
                        if(blog.hashtags && blog.hashtags[0] === appliedFilter) 
                            return <BlogCard key={index} id={blog.id} blogData={blog}/>;
                        return "";
                        }
                        return <BlogCard key={index} id={blog.id} blogData={blog} />
                    }
                    return "";
                }): <img src={emptyIcon} alt="" width="100%"/>}
            </>
    }
    return <React.Suspense fallback={<div>Loading...</div>}>
         <Col xl={9}>
            {DisplayBlogsFunc()}
            { appliedFilter.blogTitle=== "" &&
            <div className='text-center my-2'>
                {blogs.length >1 &&<button 
                    onClick={()=>getMoreBlogsFunc(dispatchBlogs, postsNumber, setpostsNumber)} 
                    className='btn btn-primary '>Show more
                </button>}
            </div>}
        </Col>
        </React.Suspense>;
}
