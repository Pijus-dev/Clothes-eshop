import React from "react";
import "./comment-section.scss";

import ReactStars from "react-rating-stars-component";

const CommentSection = ({ name, comment, time, rating }) => (
  <div className="comment-block">
    <div className="comment">
      <h3>{name}</h3>
      <p>{comment}</p>
    </div>
    <div className="posted-time">
      <p>{time}</p>
      <ReactStars value={rating} edit={false}></ReactStars>
    </div>
  </div>
);

export default CommentSection;
