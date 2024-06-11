import React from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book, addToBookshelf, isAdded }) => {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>Edition Count: {book.edition_count}</p>
      {!isAdded && (
        <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
      )}
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
  addToBookshelf: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired,
};

export default BookCard;
