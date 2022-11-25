import {z} from 'zod';

export const userSchema = z.object({
    body: z.object({
        username: z.string({required_error: 'Name is required'}).min(2, 'Name must be more the 1 char'),
        password: z.number({required_error: 'Password is required'}),
        email: z.string({required_error: 'Email is required'}),
        role: z.enum(['admin', 'user']),
        joiningYear: z.string({required_error: 'Joining year is required'}),
        age: z.number({required_error: 'Age is required'}),
    })
})

// export const userParamsSchema = z.object({
//     params: z.object({
//         id: z.string({required_error: 'please send a string params'})
//     }),
//     body: z.object({
//         username: z.string({required_error: 'Name is required'}).min(2, 'Name must be more the 1 char'),
//         password: z.number({required_error: 'Password is required'}),
//         email: z.string({required_error: 'Email is required'}),
//         role: z.enum(['admin', 'user']),
//         joiningYear: z.string({required_error: 'Joining year is required'}),
//         age: z.number({required_error: 'Age is required'}),
//     })
// })

export const userParamsSchema = z.object({
    params: z.object({
        param: z.string({required_error: 'please send a string params'})
    })
})

// export const searchByNameMovieSchema = z.object({
//     params: z.object({
//         name: z.string({required_error: 'please send a string params'})
//     })
// })

// export const searchByGenreMovieSchema = z.object({
//     params: z.object({
//         genre: z.string({required_error: 'please send a string params'})
//     })
// })

export type userParamsSchemaType = z.infer <typeof userParamsSchema>['params'];
// export type searchByNameMovieSchemaType = z.infer <typeof searchByNameMovieSchema>['params'];
// export type searchByGenreMovieSchemaType = z.infer <typeof searchByGenreMovieSchema>['params'];

