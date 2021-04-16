import React from 'react';
import classes from './Blog.module.css';
import { blogListing } from '../../service/constants';

const Blog = () => {
  if (!blogListing) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      {blogListing.map((blog) => {
        return (
          <div key={blog.id} className={classes.Blog}>
            <h1>{blog.title}</h1>
            <p>Created on {blog.date}</p>
            <h3>{blog.category}</h3>
            <p>{blog.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
