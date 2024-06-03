const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const {verifyUser,verifyToken}=require('../midlleware/verifyUser')
const router = express.Router();

const prisma = new PrismaClient();

//Afficher tous les utilisateurs
router.get('/', async (req, res, next) => {

    try {
        const users = await prisma.user.findMany()
        users.length == 0 ? res.json("Il y'a aucun utilisateur inscris") : res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}
)

//Afficher un utilisateur specifique
router.get('/:id', async (req, res, next) => {
    const userId = req.params.id
    try {
        const existingUser = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
        if (!existingUser) {
            res.status(404).json("user introuvable !!!")
        }

        res.status(200).json(existingUser)


    } catch (error) {
        next(error)
    }
}
)


//modifier un utilisateur
router.put('/:id',verifyToken, async (req, res, next) => {
    const { username, email, password } = req.body;

    const userId = req.params.id
    try {
        const hashPass= await bcrypt.hash(password,10)
        const existingUser = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
        if (!existingUser) {
            res.status(404).json("Utilisateur introuvable !!!")
        }

        await prisma.user.update({
            where: { id: existingUser.id }, data: {
                username,
                email,
                password:hashPass
            }
        })
            .then(response => {
                res.status(200).json('Utilisateur modifier avec succes')
            })


    } catch (error) {
        next(error)
    }
}
)



//Afficher tous les hotel
router.delete('/:id', async (req, res, next) => {
    const userId = req.params.id
    try {
        const existingUser = await prisma.user.findUnique({ where: { id: parseInt(userId) } })
        if (!existingUser) {
          return  res.status(404).json("Utilisateur introuvable !!!")
        }

        await prisma.user.delete({
            where: {
                id: existingUser.id
            }
        })
            .then(response => {
                res.status(200).json("Utilisateur supprimer avec succes")
            })

    } catch (error) {
        next(error)
    }
}
)

module.exports = router
