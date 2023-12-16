import { useState, useEffect } from "react";
import Comment from "./Components/Comment";
import useNode from "./hooks/useNode";
import "./styles.css";
const comments = {
  id: 1,
  items: [],
};
const App = () => {
  const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
  const [comments, setComments] = useState(storedComments);
  const { insertNode, editNode, deleteNode, sortCommentsByDate } = useNode();
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleInsertNode = (folderId, name, comment) => {
    const finalStructure = insertNode({ ...comments }, folderId, name, comment);
    setComments(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(comments, folderId, value);
    setComments(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(comments, folderId);
    const temp = { ...finalStructure };
    setComments(temp);
  };

  return (
    <div className="App">
      <Comment
        key={comments.length > 0 ? comments[0].id : 1}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        comment={comments}
        sortCommentsByDate={sortCommentsByDate}
      />
    </div>
  );
};

export default App;
