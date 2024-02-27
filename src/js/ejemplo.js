/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;
  console.log(typeof list1, list1.length);
  console.log(list1[0]);

  let n = list1.length < list2.length ? list1.length : list2.length;
  let result = [];
  for (let i = 0; i < n; i++) {
    if (list1[i] <= list2[i]) {
      result.push(list1[i]);
      result.push(list2[i]);
    } else {
      result.push(list2[i]);
      result.push(list1[i]);
    }
  }

  return result;
};

console.log(mergeTwoLists([1, 2, 4], [1, 3, 4]));
