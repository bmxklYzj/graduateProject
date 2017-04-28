(function () {
  var res = {
    status: 200,
    error: null,
    data: [

    ]
  };

  for (var i = 0; i < 5; i++) {
    res.data.push({
      "title": "春季校园招聘-互联网公司面试题：内含题目解答",
      "finishedCnt": ~~(Math.random() * 10) + 1,
      "heat":  ~~(Math.random() * 10) + 1
    });
  }
  return res;

})();
