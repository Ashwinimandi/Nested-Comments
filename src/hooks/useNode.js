const useNode = () => {
  const insertNode = function (tree, commentId, item, comment) {
    if (tree.id === commentId) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        comment: comment,
        items: [],
        timestamp: new Date().toLocaleString(),
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item, comment);
    });

    return { ...tree, items: latestNode };
  };

  const editNode = (tree, commentId, inputcomment) => {
    if (tree.id === commentId) {
      tree.comment = inputcomment;
      return tree;
    }

    tree.items.map((ob) => {
      return editNode(ob, commentId, inputcomment);
    });

    return { ...tree };
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  const sortCommentsByDate = (tree = [], ascending) => {
    const sortedItems = tree.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
    console.log("6655", sortedItems, tree);
    return sortedItems;
    // return {
    //   ...tree,
    //   items: sortedItems.map((item) => sortCommentsByDate(item, ascending)),
    // };
  };

  return { insertNode, editNode, deleteNode, sortCommentsByDate };
};

export default useNode;
