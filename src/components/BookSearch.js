import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [addedBooks, setAddedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the initial 10 books when the component mounts
    axios.get(`https://openlibrary.org/search.json?q=initial&limit=10&page=1`)
      .then(res => {
        setBooks(res.data.docs);
      })
      .catch(error => {
        console.error('Error fetching initial books:', error);
      });

    // Load added books from localStorage
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setAddedBooks(bookshelf.map(book => book.key));
  }, []);

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
    setAddedBooks([...addedBooks, book.key]);
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
          <BookCard
            key={index}
            book={book}
            addToBookshelf={addToBookshelf}
            isAdded={addedBooks.includes(book.key)}
          />
        ))}
      </div>
      <button onClick={() => navigate('/bookshelf')}>My Bookshelf</button>
    </div>
  );
};

export default BookSearch;
