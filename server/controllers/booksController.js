import bookModel from "../models/booksModel.js"


const addBook = async (req, res) => {
    const { title, author, genre, rating } = req.body;
    if (!title || !author || !genre || rating == undefined) {
        return res.json({ success: false, message: "Please provide complete information" });
    }

    try {
        const book = await bookModel.findOne({ title, author, genre });

        if (book) {
            return res.json({ success: false, message: "This version of book already exists" });
        }

        const newBook = new bookModel({ title, author, genre, rating });
        await newBook.save();
        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

const getAllBooks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const genre = req.query.genre;
    const rating = parseFloat(req.query.rating);
    const title = req.query.title;
    const author = req.query.author;

    const skip = (page - 1) * limit;

    let filter = {};
    if (genre) filter.genre = genre;
    if (rating) filter.rating =  rating;
    if (title) filter.title =  title;
    if (author) filter.rating =  author;

    try {
        const books = await bookModel.find(filter).skip(skip).limit(limit);
        const num = await bookModel.countDocuments();

        res.json({ books, num });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }

}

const getBook = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const book = await bookModel.findById(id);
        if (book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json({ success: false, message: "book not exists" });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
export { addBook, getAllBooks, getBook };