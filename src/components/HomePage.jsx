import { useHistory } from 'react-router';
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '15',
            }}>
            <Header as="h1" inverted>
              <Image src="/assets/birthday.png" />
              <p>Birth days</p>
            </Header>
          </div>
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
