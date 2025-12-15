
import { userModel } from "../models/userSchema.js"
import { userValidator } from "../validator/userInputValidator.js"
import {generateToken} from "../utils/generateToken.js";
import {loginValidator} from "../validator/loginValidator.js";
import bcrypt from "bcryptjs";

export const getHome = (req, res) => {
    res.send('Hello world!')
}

export const getAbout = (req, res) => {
    res.send('About page')
    console.log('Testing')
}

export const createUser = async(req, res) => {
    try {
        const {name, email, password} = req.body

        if(name !== "" && email !== "" && password !== "") {

            const {error} = userValidator.validate({
                name,
                email,
                password
            })

            if(error) {
                return res.status(400).json({
                    message: error.details[0].message,
                    error: true
                })
            }

            const existingUser = await userModel.findOne({email}).select('-password')

            if(existingUser) {
                return res.status(400).json({
                    message: 'User already exists, please log in.',
                    data: existingUser
                })
            }

            const newUser = await userModel.create({
                name,
                email,
                password
            })

            const token = await generateToken(newUser._id)

            res.cookie('genToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 7
            })

            return res.status(201).json({
                message: 'User created successfully!',
                data: newUser
            })
        }else{
            return res.status(400).json({
                message: "All fields are required!",
                error: true
            })
        }
    } catch (err) {
        if(err instanceof Error) {
            return res.status(500).json({
                message: err.message,
                error: err.error
            })
        }
    }
}

export const loginUser = async(req, res) => {

        try{
            const {email, password} = req.body
            if(email !== "" && password !== "") {
                const {error} = loginValidator.validate({email, password})
                if(error) return res.status(400).json({message: error.details[0].message})

                const userExists = await userModel.findOne({email})

                if(!userExists) return res.status(400).json({message: "User does not exist!"})

                const comparePassword = await bcrypt.compare(password, userExists.password, )

                if(comparePassword) {
                    return res.status(200).json({
                        message: "Login successful!",
                        data: userExists
                    })
                }else{
                    return res.status(400).json({message: "Invalid credentials!"})
                }
            }else{
                return res.status(400).json({message: "All fields are required!"})
            }


        }catch(err){
        if(err instanceof Error) console.error(err.message)
        }

}