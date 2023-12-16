import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";

const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
  sortCommentsByDate,
}) => {
  const [inputName, setInputName] = useState(""); // new state for name input
  const [inputComment, setInputComment] = useState(""); // new state for comment input
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const [sortToggle, setSortToggle] = useState(true);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, inputName, inputComment);
      setShowInput(true);
      setInputName("");
      setInputComment("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };
  const sortByDate = () => {
    sortCommentsByDate(comment?.items, sortToggle);
    setSortToggle(!sortToggle);
  };
  // console.log(comment.timestamp);
  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            {/* New input for Name */}
            <input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Name..."
            />

            {/* New input for Comment */}
            <input
              type="text"
              className="inputContainer__input"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="Type your comment..."
            />

            <Action
              className="reply comment"
              type="COMMENT"
              handleClick={onAddComment}
            />
            <button onClick={sortByDate}>sort</button>
          </>
        ) : (
          <>
            <span>{comment.name}</span>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.comment}
            </span>
            <span>{comment.timestamp}</span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="SAVE"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="CANCEL"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type={
                      <>
                        {expand ? (
                          <UpArrow width="10px" height="10px" />
                        ) : (
                          <DownArrow width="10px" height="10px" />
                        )}{" "}
                        REPLY
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="reply"
                    type="EDIT"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="reply"
                    type="DELETE"
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            {/* New input for Comment */}
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Type your comment..."
            />
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
              placeholder="Type your comment..."
            />

            <Action className="reply" type="REPLY" handleClick={onAddComment} />
            <Action
              className="reply"
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          console.log("test", comment?.items);
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
