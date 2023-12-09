import express from 'express';
import cors from 'cors';
import authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authJWT.js';
const router = express.Router();

router.post("/register", new authController().signup);
router.post("/login", new authController().signin);
router.get("/logout", new authController().logout);

router.get('/hiddencontent', verifyToken, (req, res) => {
    if(!req.user){
        res.status(403).send({
            message: "Invalid JWT token"
        });
    }
    if(req.user.role == 'admin'){
        res.status(200).send({
            message: `${req.user.name}`
        })
    } 
    else {
        res.status(403).send({
            message: "Unauthorised access"
        })
    }
})

export default router;