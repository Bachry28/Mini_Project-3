const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const path = require ("path");


async function createUserRegister(req, res) {
    const foto = req.file ? req.file.path : 'default_path_if_file_not_present';
    const { first_name, 
            last_name, 
            username, 
            password, 
           } 
            = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        password: hashedPassword,
        foto,
      },
    });
    res.status(201).json({ 
      message: "Succesfully Register!",
      user 
    });
  }
  catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};




module.exports = {
  createUserRegister,
};
