import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './help.module.css';
/***** icons ******/
import markdownExmapleIcon1 from '../img/markdown_help_example.png';
import markdownExmapleIcon2 from '../img/markdown_help_example2.png';


export default function Help(props) {

  return <div className='text-light'>
    <div className={styles.helpPresentation}>
      <h1 className='display-2 text-light'>Need help getting started?</h1>
    </div>
    <div className='p-5 text-light'>
      <h2 className='display-3'>Getting started</h2>
      <ul>
        <li>Chose any article you wanna read without logging in.</li>
        <li>To like or comment on an article you have to be logged in.</li>
        <li>user's rate is summed up by calculating the rate of his articles.</li>
      </ul>
      <br></br>
      <h2 className='display-3'>Create an article</h2>
      <span>To create an article simply go to :</span><br></br>
      {'>'} <span className="bg-primary px-1">user icon</span> {'>'} 
      <span className="bg-primary px-1">View account</span> {'>'} 
      <span className="bg-primary px-1">Create article</span> 
      <br></br>
      <h5 className='text-danger d-inline p-3'><strong>Note</strong> </h5>
      <span>Although you can write a normal text but it is preferred to use markdown language to get a better layout.</span>
      <h2 className='display-3'>Markdown language</h2>
      <p>Here are some examples on markdown language to get you started</p>
      <img src={markdownExmapleIcon1} className='py-3' alt="" width="90%" />
      <img src={markdownExmapleIcon2} className='py-3' alt="" width="90%" />
      <h5 className='display-6'>Sources: </h5>
      <a href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet' target='_blank'>Markdown Cheatsheet</a><br></br>
      <a href='https://remarkjs.github.io/react-markdown/' target='_blank'>React Markdown</a>
    </div>
  </div>;
}