import React, { useState, useEffect } from 'react';
import requesteTemplate from '../../utilities/requestTemplate';
import BlogCard from '../blogCard'
import emptyIcon from '../../img/No_posts_yet.png';

const getArticlesFunc = async ()=>{ // fetch your articles
    try{ // real URL `/articles/:userId?yourArticles=true`
        let res = await requesteTemplate('posts', 'GET', 'include');
        res = await res.json();
        return res;
    }catch(e){
        console.log(e);// to be relaced 
        return [];
    }
}
export default function YourArticles(props) {
    const [yourArticles, setYourArticles] = useState([]);
    useEffect(() => {
        getArticlesFunc()
        .then((arr)=>setYourArticles(arr));
    }, [props.userId])
    
  return (
    <>
        {yourArticles.length > 1? yourArticles.map((article, index)=> {
            return <BlogCard key={`yourArticles-${index}`} id={article.id} blogData={article}/>;
        }): <img src={emptyIcon} alt="" width="100%"/>}
    </>
  )
}
