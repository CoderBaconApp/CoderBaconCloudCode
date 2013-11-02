Parse.Cloud.afterSave("Message", function(request) {
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('user', request.object.get('receiver'));
        
  Parse.Push.send({
      where: pushQuery,
      data: {
        alert: "New message from " + request.user.get('name')
      }
  }, {
    success: function() {
      // Push was successful
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});