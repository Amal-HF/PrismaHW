import {z} from 'zod';

export const addMovieSchema = z.object({
    body: z.object({
        name: z.string({required_error: 'Name is required'}).min(2, 'Name must be more the 1 char'),
        genre: z.enum(['Drama','Action', 'Comedy']),
        rating: z.number().gte(1, 'Rating must be from 1-5').lte(5,'Rating must be from 1-5'),
        duration: z.number().gte(60, 'Duration must be more than 60 m'),
    })
})

export const updateMovieSchema = z.object({
    params: z.object({
        id: z.string({required_error: 'please send a string params'})
    }),
    body: z.object({
        name: z.string({required_error: 'Name is required'}).min(2, 'Name must be more the 1 char'),
        genre: z.enum(['Drama','Action', 'Comedy']),
        rating: z.number().gte(1, 'Rating must be from 1-5').lte(5,'Rating must be from 1-5'),
        duration: z.number().gte(60, 'Duration must be more than 60 m'),
    })
})

export const deleteMovieSchema = z.object({
    params: z.object({
        id: z.string({required_error: 'please send a string params'})
    })
})

export const searchByNameMovieSchema = z.object({
    params: z.object({
        name: z.string({required_error: 'please send a string params'})
    })
})

export const searchByGenreMovieSchema = z.object({
    params: z.object({
        genre: z.string({required_error: 'please send a string params'})
    })
})

export type movieIDSchemaType = z.infer <typeof updateMovieSchema>['params'];
export type searchByNameMovieSchemaType = z.infer <typeof searchByNameMovieSchema>['params'];
export type searchByGenreMovieSchemaType = z.infer <typeof searchByGenreMovieSchema>['params'];

