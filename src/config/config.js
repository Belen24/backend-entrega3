import dotenv from "dotenv";
dotenv.config();

export const config = {
    server:{
        port:process.env.PORT,
        secretSession:process.env.SECRET_SESSION,
        persistence: process.env.PERSITENCE
    },
    mongo:{
        url:process.env.MONGO_URL
    }
}