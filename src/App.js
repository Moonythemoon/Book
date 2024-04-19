import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import './styles.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/create-book" element={<CreateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
