import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db.connection";
import { 
    movieIDSchemaType, 
    searchByNameMovieSchemaType,
    searchByGenreMovieSchemaType,
} from "../Zod.schema/movie.schema";
import {movie} from '@prisma/client'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


export const getMovieHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const movies = await prisma.movie.findMany();
        res.status(200).json(movies);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const addMovieHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const newMovie = req.body as movie;
        await prisma.movie.create({
            data: newMovie,
        });
        return res.status(201).json({
            message: 'Movie added :)'
        })
    } catch (err){
        const prismaError = err as PrismaClientKnownRequestError;
        if (prismaError.code == 'P2002') {
            return res.status(400).json({
                message: 'This movie name have been used before',
            });
        }
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const updateMovieHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const newMovie = req.body as movie;
        const {id} = req.params as movieIDSchemaType;
        await prisma.movie.update({
            where: {id},
            data: newMovie
        })
        return res.status(200).json({
            message: 'Movie updated :)'
        })
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const deleteMovieHandler = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {id} = req.params as movieIDSchemaType;
        await prisma.movie.delete({
            where: {id}
        })
        return res.status(200).json({message: 'Movie deleted :)'});
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const searchByNameMovieHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const {name} = req.params as searchByNameMovieSchemaType ;
        const movies = await prisma.movie.findFirst({
            where: {
                name: name
            },
        });
        res.status(200).json(movies);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

export const searchByGenreMovieHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const {genre} = req.params as searchByGenreMovieSchemaType;
        // const genre = id.toLowerCase();
        const movies = await prisma.movie.findMany({
            where: {
                genre : genre
            },
        });
        res.status(200).json(movies);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}

// ما فهمت الفكرة زين، ولكني سويت هذي الدالة بحيث ترتب لي كل الافلام بناء على تقييمهم بشكل تصاعدي
export const moreThanRatingMovieHandler = async (
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try{
        const movies = await prisma.movie.findMany({
            orderBy: 
                {
                    rating: 'asc',
                }
            
        });
        res.status(200).json(movies);
    } catch (err){
        console.log(err);
        return res.status(500).json({
            message: 'Server Error !'
        })
    }
}
