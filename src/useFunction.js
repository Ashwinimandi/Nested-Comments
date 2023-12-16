export const addComment = (tree, commentId, name, comment) => {
  if (tree.id === commentId) {
    tree.replies.unshift({
      id: new Date().getTime(),
      name: name,
      comment: comment,
      items: [],
      timestamp: new Date().toLocaleString(),
    });
    return tree;
  }
  let latestNode = [];
  latestNode = tree.replies.map((ob) => {
    return addComment(ob, commentId, name, comment);
  });

  return { ...tree, replies: latestNode };
};
