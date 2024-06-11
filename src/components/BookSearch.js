import React, { useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${e.target.value}&limit=10&page=1`);
      setBooks(res.data.docs);
    }
  };

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
  };

  return (
    <div>
      <input 
        type="text"
        value={query}
        onChange={searchBooks}
        placeholder="Search by book name..."
      />
      <div className="book-list">
        {books.map((book, index) => (
          <BookCard key={index} book={book} addToBookshelf={addToBookshelf} />
        ))}
      </div>
      <button onClick={() => window.location.href = '/bookshelf'}>My Bookshelf</button>
    </div>
  );
};

export default BookSearch;
