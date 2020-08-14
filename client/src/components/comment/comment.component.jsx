import React, { useState, useEffect } from "react";

import "./comment.scss";

import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { firestore, firebase } from "../../firebase/firebase";
import CommentSection from "../common/ comment-section/commentSection";

const Comment = ({ currentUser, history, db }) => {
  const [posts, setPosts] = useState([]);
  const [stars, setStars] = useState("");
  const [comment, setComment] = useState("");

  const addComment = () => {
    const newComment = {
      comment: comment,
      postedTime: firebase.firestore.Timestamp.fromDate(new Date()),
      userName: currentUser.displayName,
      rating: stars,
    };

    db.collection("reviews")
      .add(newComment)
      .then(() => {
        setPosts([...posts, { ...newComment }]);
        setComment("");
        setStars("");
      });
  };

  const getComment = () => {
    db.collection("reviews")
      .get()
      .then((data) => {
        const array = [];
        data.forEach((doc) => {
          const obj = {
            comment: doc.data().comment,
            userName: doc.data().userName,
            rating: doc.data().rating,
            postedTime: doc.data().postedTime,
          };
          array.push(obj);
        });
        setPosts(array);
      });
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="comment-section">
      <h1>Product reviews:</h1>
      {posts.map((post) => (
        <CommentSection
          key={post.id}
          name={post.userName}
          comment={post.comment}
          time={post.postedTime.toDate().toLocaleDateString("lt")}
          rating={post.rating}
        />
      ))}
      {currentUser ? (
        <div className="text">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
          ></textarea>
          <div className="rating">
            <ReactStars
              count={5}
              activeColor="#ffd700"
              edit={true}
              onChange={(e) => setStars(e)}
            ></ReactStars>
          </div>
        </div>
      ) : null}
      {currentUser ? (
        <div className="comment-button">
          <button onClick={() => addComment()}>Submit</button>
        </div>
      ) : (
        <div className="comment-button">
          <button onClick={() => history.push("/login")}>Login first</button>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(Comment));
