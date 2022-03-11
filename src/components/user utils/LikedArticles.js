import React, { useState, useEffect } from 'react';
import requesteTemplate from '../../utilities/requestTemplate';
import BlogCard from '../blogCard';
import emptyIcon from '../../img/No_posts_yet.png';

const getArticlesFunc = async ()=>{ // fetch liked articles
    try{ // real URL `/articles/:userId?likedArticles=true`
        let res = await requesteTemplate(`posts/1555`, 'GET', 'include');
        res = await res.json();
        return [res];
    }catch(e){
        console.log(e);// to be relaced 
        return [];
    }
}
// liked articles component
export default function LikedArticles(props) {
  const [likedArticles, setLikedArticles] = useState([]);
  useEffect(() => {
      getArticlesFunc()
      .then((arr)=>setLikedArticles(arr));
  }, [props.userId])

  return (<>
      {likedArticles.length >1? likedArticles.map((article, index)=> {
          return <BlogCard key={`likedArticles-${index}`} id={article.id} blogData={article}/>;
      }): <img src={emptyIcon} alt="" width="100%"/>}
    </>)
}
