import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

function ImageCard({ image, deleteImage, saveImage }) {
  const authorName = image.user.name || 'Unknown';
  const portfolioUrl = image.user.portfolio_url;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>{' '}
        {!image.saved && (
          <Button variant="secondary" onClick={() => saveImage(image.id)}>
            Save
          </Button>
        )}
      </Card.Body>
      <Card.Footer className="text-center">
        {portfolioUrl ? (
          <Nav.Link href={portfolioUrl}>{authorName}</Nav.Link>
        ) : (
          image.user.name
        )}
      </Card.Footer>
    </Card>
  );
}

export default ImageCard;
