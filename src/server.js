import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars"
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";

import { logError, logInfo, logSuccess } from "./utils/console.utils.js";
import __dirname from "./utils.js";
import ENV from "./config/env.config.js";
import errorHandler from "./middleware/error.middleware.js";
import appRouter from "./routes/app.routes.js"
import viewsRoutes from "./routes/views.routes.js"
import initializePassport from "./config/passport.config.js";






const app = express()

//Plantillas de handlebars
const multiplyHelper = function(a, b){
    return a * b
}
const compareOwner = function (a, b){
    return a == b
}
app.engine('handlebars', handlebars.engine({
    helpers: {
        multiply : multiplyHelper,
        compare : compareOwner
    }
}))
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

//Middleware de express
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

//Session Middleware
app.use(session({
    store:MongoStore.create({
        mongoUrl:ENV.DB_URI
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}));
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/api', appRouter)
app.use('/', viewsRoutes)



//Error handler
app.use(errorHandler) //SIEMPRE SE DEFINE AL FINAL 

//Connect to the database and run the server
mongoose.connect(ENV.DB_URI)
    .then(()=>{
        
        
        logInfo('Conected to DB successfuly!')
        

        server.on('error', (error) => {
            logError(`An error occurred while trying to start the server on ${serverUri}`)
            throw error
        })
    })
.catch((error) => {
    logError('An error occured tryin to connect to the DB at the specified URI')
    throw error
})

const serverUri = `http://localhost:${ENV.PORT}`
const server = app.listen(ENV.PORT, () => {  
    logSuccess(`The server is running on ${serverUri}`)
})

//Socket and chat

// Sockets
const messages = [];
const io = new Server(server);

io.on('connection', (socket) => {
  console.log("New client connected!");

  socket.on('login', (user) => {
    socket.emit('message-logs', messages)
    socket.emit('welcome', user)
    socket.broadcast.emit('new-user', user)
  })

  socket.on('message', (data)=> {
    messages.push(data);
    io.emit('message-logs', messages)
  })
});



