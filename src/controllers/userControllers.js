
import { userModel } from "../models/userSchema.js"

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
            const newUser = await userModel.create({
                name,
                email,
                password
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