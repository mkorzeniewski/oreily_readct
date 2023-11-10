import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Col, Container, Row } from 'react-bootstrap';
import Welcome from './components/Welcome';
import axios from 'axios';
import WaitingSpinner from './components/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const notify = () => {
    console.log('notify');
    toast.info('Wow so easy !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  async function getSavedImages() {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSavedImages();
  }, []);

  async function handleSaveImage(id) {
    const image = images.find((image) => image.id === id);
    image.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, image);
      setImages(images.map((i) => (i.id === id ? { ...i, saved: true } : i)));
      notify();
    } catch (err) {
      console.log(err);
    }
  }

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

  async function deleteImage(imageId) {
    try {
      if (images.filter((image) => image.id === imageId)[0]?.saved) {
        await axios.delete(`${API_URL}/images/${imageId}`);
      }
      setImages(images.filter((image) => image.id !== imageId));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Header title="Images Gallery" />
      {loading ? (
        <WaitingSpinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((img, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={img}
                      deleteImage={deleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
