import GlobalStyle from './styles/GlobalStyle';
import Heading from './ui/Heading';
import Button from './ui/Button';
import Row from './ui/Row';

function App() {
  return (
    <>
      {/* global style needs to be the sibling component it doesnot accept children */}
      <GlobalStyle />
      <Row>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">The Wild Oasis</Heading>

        <Row type="horizontal">
          <div>
            <Heading as="h3">Check In and Out </Heading>
            <Button size="small">Check In</Button>
            <Button variation="danger" size="small">
              Check Out
            </Button>
          </div>
        </Row>
      </Row>
    </>
  );
}

export default App;
