import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

class authController {
    signup = async (req, res) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        try {        
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: bcrypt.hashSync(req.body.password, 8)
            });
            const savedUser = await user.save();
            // const link = `http://localhost:4000/`
            await this.verifyEmail(req.body.email);
            res.status(200).json(savedUser);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: error.message
            });
        }
    }

    signin = async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
    
            if(!user){
                return res.status(404).send({
                    message: "User not found."
                })
            }
    
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
    
            if(!passwordIsValid){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                })
            }
    
            const token = jwt.sign({
                id: user.id
            }, process.env.API_SECRET, {
                expiresIn: 86400
            });

            res.cookie('accessToken', token);
    
            res.status(200).send({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }, 
                message: "Login successfull",
                accessToken: token
            })
    
        } catch (error) {
            res.status(500).send({
                message: error.message
            });
        }
    }

    logout = async (req, res) => {
        res.clearCookie('accessToken'); // Replace 'accessToken' with your token cookie name
        return res.status(200).json({ message: 'Logout successful' });
    };

    verifyEmail = async (email) => {
        try {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
    
            let info =  await transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Account Verification',
                text: `Welcome`,
                html:`
                    <h1>Hello! Welcome to our website.</h1>
                    <a href=${link}>Click here to activate your account</a>
                `
            })
        } catch (error) {
            console.log(error, "mail failed");
        }
    }
}

export default authController;