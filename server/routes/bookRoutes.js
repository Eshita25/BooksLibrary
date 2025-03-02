import express from 'express';
import {addBook,getAllBooks,getBook} from '../controllers/booksController.js'


const bookRouter = express.Router();

bookRouter.post('/addBook',addBook);
bookRouter.get('/getAllBook', getAllBooks)
bookRouter.get('/getBook/:id', getBook)


export default bookRouter;