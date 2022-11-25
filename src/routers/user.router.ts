import express from 'express';
import validate from '../middleware/validate';
import { 
    getMovieHandler, 
    addMovieHandler, 
    updateMovieHandler, 
    deleteMovieHandler, 
    searchByNameMovieHandler,
    searchByGenreMovieHandler,
    moreThanRatingMovieHandler,
} from '../controllers/movie.conroller';
import { 
    addMovieSchema,
    updateMovieSchema,
    deleteMovieSchema, 
    searchByNameMovieSchema,
    searchByGenreMovieSchema,
 } from '../Zod.schema/movie.schema';

const router = express.Router();

router.get('/', getMovieHandler);
router.post('/', validate(addMovieSchema), addMovieHandler);
router.put('/:id', validate(updateMovieSchema), updateMovieHandler);
router.delete('/:id', validate(deleteMovieSchema), deleteMovieHandler);
router.get('/name/:name', validate(searchByNameMovieSchema), searchByNameMovieHandler);
router.get('/genre/:genre', validate(searchByGenreMovieSchema), searchByGenreMovieHandler);
router.get('/rating', moreThanRatingMovieHandler);


export default router;