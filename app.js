const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require('cors');
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser())
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./documentation/APIdocumentation.json');

const userregisterroutes = require ("./routes/userregisterroutes");
const userloginroutes = require ("./routes/userloginroutes")
const commentroutes = require ("./routes/commentroutes")
const postroutes = require ("./routes/postroutes")
const { authenticateUser } = require("./middleware/auth");

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  optionsSuccessStatus: 200,
  credentials: true
}));


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use("/", userregisterroutes);


app.use("/", userloginroutes);


app.use("/comment", commentroutes);

app.use("/post", postroutes);



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Start the server
if(process.env.NODE_ENV != "test") {
  app.listen(8000, () => {
    console.log('Server started on port 8000');
  });
}

module.exports = app
