(function () {
  var res = {
    status: 200,
    error: null,
    data: {
      list: [],
      totalCnt: 10
    }
  };

  for (var i = 0; i < 15; i++) {
    res.data.list.push({
      "title": i + "春季校园招聘-互联网公司面试题互联网公司面试题：内含题目解答互联网公司面试题互联网公司面试题：内含题目解答互联网公司面试题互联网公司面试题：内含题目解答",
      "type": 2,
      "options": ["选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A", "选项B", "选项C", "选项D"]
    });
  }
  return res;
})();
