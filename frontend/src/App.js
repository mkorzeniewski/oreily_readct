import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Col, Container, Row } from 'react-bootstrap';
import Welcome from './components/Welcome';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setImages([{ title: word, ...data }, ...images]);
        setWord('');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteImage(imageId) {
    setImages(images.filter((image) => image.id !== imageId));
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((img, i) => (
              <Col key={i} className="pb-3">
                <ImageCard image={img} deleteImage={deleteImage} />
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
