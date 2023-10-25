import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

function Welcome() {
  return (
    <Jumbotron>
      <h1>Hello, world!</h1>
      <p>
        This is simple app that retrives photos using Unsplash API. In ordred to
        start enter any search term in the input field and click on the search
        button.
      </p>
      <p>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </p>
    </Jumbotron>
  );
}

export default Welcome;
