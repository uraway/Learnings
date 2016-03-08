var axios = require('axios');

axios({
  url: 'http://cloud.feedly.com/v3/search/feeds?query=reactjs',
  method: 'GET',
})
  .then(function(response){
    console.log(response);
    for (i in response.data.results) {
      console.log(response.data.results[i])
    }
  })
  .catch(function(response) {
    if (response instanceof Error) {
      console.log('Error', response.message);
    } else {
      console.log(response.data);
      console.log(response.status);
      console.log(response.headers);
      console.log(response.config);
    }
  });
