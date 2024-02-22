import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt"
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    try{
        const {name, username, email, password} = req.body;

        const isUser = await prisma.user.findUnique({
            where: {email}
        });

        if(isUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {name, username, email, hashedPassword}
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).end();
    }
}