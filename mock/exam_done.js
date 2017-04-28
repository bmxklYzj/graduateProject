(function () {
  var res = {
    status: 200,
    error: null,
    data: {
      
    }
  };

  res.data = {
    "createUser": "张三李四",
    "createTime": "2017-04-01",
    "finishedCnt": ~~(Math.random() * 10) + 1,
    "likeCnt": ~~(Math.random() * 10) + 1,
    "commentCnt": ~~(Math.random() * 10) + 1,
    "heat":  ~~(Math.random() * 10) + 1,
    "accuracy": Math.random().toFixed(2)
  };

  return res;
})();
