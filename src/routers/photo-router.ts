import { Router, Request, Response } from "express"
import { photoServices } from "../services/photo-services";

export const photoRouter = Router();

photoRouter.get('/', async (req: Request, res: Response) => {
    const results = await photoServices.getAllPhotos()

    res.status(200).send(results);
})
photoRouter.post('/', async (req: Request, res: Response) => {    
    const { photoUrl, description} = req.body;

    if(!photoUrl) {

        res.status(400).send("PhotoUrl is required")
        return;
    }
    
    const insertedId = await photoServices.createPhoto({photoUrl, description});

    res.status(201).send({ insertedId })
});


//PATCH request to /photo/{PHOTO_ID} with a body of { likes: 1}
photoRouter.patch('/:id', async (req: Request, res: Response) => {
    const {id } = req.params
    const { likes } = req.body

    if(!likes){
        res.status(400).send("Likes are required.")
    }
    
    
    const photo = await photoServices.updateLikes(id, likes)

    res.status(200).send(photo);
})