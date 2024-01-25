import mongoose,{Schema} from "mongoose";

const UsuarioSchema =new Schema({
    name: {type : String, required : true},
    email: {type : String, required : true},
    password: {type : String, required : true},

    //caso queira guardar mais dados 
    //avatar: {type : string, required : false},
})

export const UsuarioModel = (mongoose.models.usuarios ||
    mongoose.model('usuarios', UsuarioSchema));