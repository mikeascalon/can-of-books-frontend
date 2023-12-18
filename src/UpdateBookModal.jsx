import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function UpdateBookModal(props) {
  const { show, handleClose, bookToUpdate, setBooks } = props;

  const updateBookDetails = (e) => {
    console.log('inside of book details');
    console.log(e);
  };

  const saveBook = () => {
    // Ensure bookToUpdate is defined before proceeding
    if (!bookToUpdate) {
      console.log('Invalid book data for update');
      return;
    }

    // Call the onSave prop to save the book details
    if (typeof props.onSave === 'function') {
      props.onSave(bookToUpdate);
    } else {
      console.error('onSave is not a function or not provided');
    }

    // Close the modal
    handleClose();
  };

  return (
    <>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Book Title"
                autoFocus
                id="updateBookFormTitle"
                value={bookToUpdate ? bookToUpdate.title : ''}
                onChange={updateBookDetails}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                id="updateBookFormDescription"
                value={bookToUpdate ? bookToUpdate.description : ''}
                onChange={(e) => setBooks({ ...bookToUpdate, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
        
            Close
          </Button>
          <Button variant="primary" onClick={saveBook}>
            Save Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateBookModal;
