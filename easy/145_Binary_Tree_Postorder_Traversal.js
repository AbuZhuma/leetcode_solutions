var postorderTraversal = function (root) {
      const result = []
      const rec = (node) => {
            if (!node) return
            rec(node.left)
            rec(node.right)
            result.push(node.val)
      }
      rec(root)
      return result 
};