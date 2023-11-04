import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Col, Container, Row } from 'react-bootstrap';
import Welcome from './components/Welcome';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);

  async function getSavedImages() {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSavedImages();
  }, []);

  async function handleSearchSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-images?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (err) {
      console.log(err);
    }

    setWord('');
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
