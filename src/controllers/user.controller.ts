import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db.connection";
import { 
    userParamsSchemaType
} from "../Zod.schema/user.schema";
import {user} from '@prisma/client'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


export const getUserHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const users = await prisma.user.findMany()
        res.status(200).json(users);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const addUserHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const newUser = req.body as user;
        await prisma.user.create({
            data: newUser,
        });
        return res.status(201).json({
            message: 'User added :)'
        })
    } catch (err){
        const prismaError = err as PrismaClientKnownRequestError;
        if (prismaError.code == 'P2002') {
            return res.status(400).json({
                message: 'This email have been used before',
            });
        }
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const getUserByIDHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const {param} = req.params as userParamsSchemaType ;
        const users = await prisma.user.findFirst({
            where: {
                id: param
            },
        });
        res.status(200).json(users);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const getUserByEmailHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const {param} = req.params as userParamsSchemaType;
        // const genre = id.toLowerCase();
        const users = await prisma.user.findMany({
            where: {
                email : param
            },
        });
        res.status(200).json(users);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

// export const getUserByAgeHandler = async (
//     req:Request, 
//     res:Response, 
//     next:NextFunction
// ) => {
//     try{
//         const {param} = req.params as userParamsSchemaType;
//         const age = parseFloat(param);
//         const users = await prisma.user.findMany({
//             where{
//                 age > age
//             }
//         });
//         res.status(200).json(users);
//     } catch (err){
//         console.log(err);
//         return res.status(500).json({
//             message: 'Server Error !'
//         })
//     }
// }

// export const getUserByEmailHandler = async (
//     req:Request, 
//     res:Response, 
//     next:NextFunction
// ) => {
//     try{
//         const {param} = req.params as userParamsSchemaType;
//         // const genre = id.toLowerCase();
//         const users = await prisma.user.findMany({
//             where: {
//                 email : param
//             },
//         });
//         res.status(200).json(users);
//     } catch (err){
//         console.log(err);
//         return res.status(500).json({
//             message: 'Server Error !'
//         })
//     }
// }
