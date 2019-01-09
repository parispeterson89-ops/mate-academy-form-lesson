const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

const createApplicationEndpoint = '/create-application';
const createApplicationEndpointForEverybody = '/create-application-for-everybody';

app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (request, response) => {
  response.render('form-example', {
    formAction: createApplicationEndpoint
  });
});

const manageResponse = (request, response) => {
  if (isFormValid(request.body)) {
    response.render('success', {
      fields: Object.keys(request.body).map((key) => [key, request.body[key]])
    });
  } else {
    response.render('fail');
  }
};

app.post(createApplicationEndpoint, (request, response) => {
  manageResponse(request, response);
});

app.post(createApplicationEndpointForEverybody, cors(), (request, response) => {
  manageResponse(request, response);
});

app.listen(port, () => console.log(`Form app listening on port ${port}!`));

const isFormValid = (formData) => {
  return !!formData.surname;
};
