function createLinkedList(arr) {
  if (!arr.length) return null;

  let head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

var insertionSortList = function(head) {
    let currentNode = head
    let newArray = []
    while(currentNode){
        newArray.push(currentNode.val)
        currentNode = currentNode.next
    }
    for (let j = 1; j < newArray.length; j++) {
        let key = newArray[j]
        let i = j - 1
        while(i >= 0 && newArray[i] > key){
            newArray[i+1] = newArray[i]
            i = i - 1
        }        
        newArray[i+1] = key
    }    
    const newHead = createLinkedList(newArray)
    return newHead
};
