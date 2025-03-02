import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id:{

    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        require:true,
        default:'general',
    },
    rating:{
        type:Number,
        require:true,
        default:' '
    }
})

const bookModel = new mongoose.model('Books', bookSchema);
export default bookModel;