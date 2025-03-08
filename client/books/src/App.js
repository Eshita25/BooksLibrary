import './App.css';
import MainBox from './paginatiojn/mainBox';
import Navbar from './nav/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/form';
import Book from './components/individual';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<MainBox />} />
          <Route path='/add' element={<Form />} />
          <Route path='/book/:id' element={<Book />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
