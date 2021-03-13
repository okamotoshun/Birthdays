import { useHistory } from 'react-router';
import React from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

import '../style/HomePage.scss';

const HomePage = () => {
  const history = useHistory();
  return (
    <div className="homepage">
      <Segment inverted textAlign="center" vertical>
        <Container>
          <Header as="h1" inverted>
            <Image
              src="/assets/birthday.png"
              style={{marginBottom: '15' }}
            />
            Birth days
          </Header>
          <Button onClick={() => history.push('/auth')} size="huge" inverted>
            Get Started
            <Icon name="right arrow" inverted />
          </Button>
        </Container>
      </Segment>
    </div>
  );
};

export default HomePage;
