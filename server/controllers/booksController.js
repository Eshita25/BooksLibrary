import bookModel from "../models/booksModel.js"


const addBook=async(req,res)=>{
const {title,author,genre,rating}=req.body;
if(!title||!author||!genre||rating==undefined){
    return res.json({success:false,message:"Please provide complete information"});
}

try {
    const book = await bookModel.findOne({title,author,genre});

    if(book){
        return res.json({success:false,message:"This version of book already exists"});
    }

    const newBook = new bookModel({title,author,genre,rating});
    await newBook.save();
    return res.json({success:true});

}catch(error){
    return res.json({success:false, message:error.message})
}

}

const getAllBooks = async(req,res)=>{
    try {
    const books = await bookModel.find();
    return res.json(books);
    }catch(error){
        return res.json({success:false, message:error.message})


    }

}

const getBook = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    try {
        const book = await bookModel.findById(id);
        if(book){
            return res.status(200).json(book);
        }else{
            return res.status(404).json({success:false, message:"book not exists"});
        }

    }catch(error){
    return res.json({success:false, message:error.message});
    }
}
export {addBook,getAllBooks,getBook};