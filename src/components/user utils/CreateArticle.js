import React, { useState } from 'react';
import requestTemplate from '../../utilities/requestTemplate';
import styles from '../user.module.css';
// markdown source
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import remarkGfm from 'remark-gfm';

// main create article component
export default function CreateArticle() {
  const [articleBody, setArticleBody] = useState("");
  const createArticleFunc = (e)=>{//function handling submitting article
    e.preventDefault();
    console.log("for: submitted successfully")
    /******  
     * Fertch post article
     * navigate to article page 
    */
  }
  //function handling adding new source 
  const addNewSourceFunc = (e)=>{
    const previousId = e.target.previousSibling.id;
    const number = Number(previousId.split('_')[3]) + 1;
    if(number >= 4) {
      e.target.style.backgroundColor = "#e70000";
      e.target.style.borderColor = "#fff";
      e.target.textContent= 'Enough sources';
      return;
    }
    const newInput = `<input class="form-control" id="create_article_title_${number}" type="text"  placeholder="Enter a source" required />`;
    document.getElementById(previousId).insertAdjacentHTML('afterend', newInput);
  }
  
  return (
    <div className='row h-100'>
      <form onSubmit={createArticleFunc} className={styles.createArticleForm+' col-lg-6'}>
        <h2 className='display-2'>Write article</h2>
        <input id="create_article_picture" className="form-control mb-3" type="file" name="img" placeholder='Enter image' accept="image/*" required/>
        <input id="create_article_title" type="text" className="form-control" placeholder="Article title" required />
        <label className='pt-2'>Article topic</label>
        <select id="create_article_tag" className="form-select my-1"  required>
            <option>Novels</option>
            <option>Self help</option>
            <option>Engineering</option>
            <option>Software development</option>
        </select>
        <input id="create_article_title_1" type="text" className="form-control my-2" placeholder="Enter a source" required />
        <button className="btn btn-success text-light" onClick={addNewSourceFunc} >
          Add another source 
        </button>
        <textarea id="create_article_description" className='form-control my-2' name='description' placeholder='description...' maxLength="150" required ></textarea>
       <textarea 
          id="create_article_body" 
          onChange={(e)=>setArticleBody(e.target.value)}
          className="form-control h-75" 
          placeholder='Write your article in markup language...' 
          required>
        </textarea>
        <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck" required />
        <label className="form-check-label px-2" >I confirm that the informations provided are verified</label>
        <button className="btn btn-primary text-light p-2 my-2" type="submit">Create article</button>
      </form>
      {window.innerWidth> 991 &&<div className='col-lg-6'>
        <h2 className='pt-3 m-2'>Text preview</h2>
        <ReactMarkdown className={styles.createArticlePreview}
          children={articleBody}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighterComponent
                  children={String(children).replace(/\n$/, '')}
                  style={docco}
                  language={match[1]}
                  PreTag="div"
                  // {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
      </div>}
    </div>
  )
}
const SyntaxHighlighterComponent = ({language, children}) => {
  console.table({children, language});
  return (
    <SyntaxHighlighter language={language || null} style={docco}>
      {children || ""}
    </SyntaxHighlighter>
  );
};