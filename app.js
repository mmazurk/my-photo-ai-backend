const express = require('express')

const app = express();

app.get('/test', function(request, response) {
    return response.send({message: "This is a test"});
  });


  app.listen(3001, function() {
    console.log('App on port 3001')
    console.log('Lets party!')
    })
