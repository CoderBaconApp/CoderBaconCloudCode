Parse.Cloud.afterSave("Message", function(request) {
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('user', request.object.get('receiver'));
  
  var alert = {
    "senderName": request.user.get('name'),
    "senderId": request.user.id
  };

  Parse.Push.send({
      where: pushQuery,
      data: alert
  }, {
    success: function() {
      // Push was successful
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});