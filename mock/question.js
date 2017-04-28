(function () {
  var res = {
    status: 200,
    error: null,
    data: [

    ]
  };

  for (var i = 0; i < 15; i++) {
    res.data.push({
      "title": "春季校园招聘-互联网公司面试题互联网公司面试题：内含题目解答互联网公司面试题互联网公司面试题：内含题目解答互联网公司面试题互联网公司面试题：内含题目解答",
      "createUser": "张三李四",
      "createTime": "2017-04-01",
      "finishedCnt": ~~(Math.random() * 10) + 1,
      "heat":  ~~(Math.random() * 10) + 1,
      type: 2,
      options: ["选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A选项A", "选项B", "选项C", "选项D"]
    });
  }
  return res;
})();
