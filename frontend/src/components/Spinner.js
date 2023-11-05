import Spinner from 'react-bootstrap/Spinner';

const spinnterStyle = {
  position: 'absolute',
  top: 'calc(50% - 1rem)',
  left: 'calc(50% - 1rem)',
};
function WaitingSpinner() {
  return <Spinner style={spinnterStyle} animation="border" variant="primary" />;
}

export default WaitingSpinner;
