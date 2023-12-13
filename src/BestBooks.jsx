import React from 'react';
// import Bootstrap from 'react-bootstrap'
import { Carousel } from 'react-bootstrap';
const SERVER = import.meta.env.VITE_SERVER_URL

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  componentDidMount() {

    const apiUrl = `${SERVER}/books`;
    console.log('Fetching from:', apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Books fetched successfully:', data);
        // Update the state with the fetched books
        this.setState({ books: data });
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
    /* TODO: render all the books in a Carousel */
  }


  renderBooksCarousel() {
    const { books } = this.state;

    return (
      <Carousel fade>
        {books.map((book) => (
          <Carousel.Item key={book._id}>
            {/* Assuming your book object has properties like title, image, etc. */}
            <img
              className="d-block w-100"
              src={book.image}
              alt={book.title}
            />
            <Carousel.Caption>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p>Status: {book.status}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  render() {
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {
          this.state.books.length ? (
             this.renderBooksCarousel()
          ) : (
            <h3>No Books Found :</h3>
          )
        }
      </>
    )
  }
}

export default BestBooks;
