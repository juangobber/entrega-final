import dotenv from "dotenv"

dotenv.config()

const ENV = {
    PORT : +process.env.PORT,
    DB_URI : process.env.DB_URI,
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET : process.env.CLIENT_SECRET,
    SESION_SECRET : process.env.SESSION_SECRET
}

export default ENV