import { db } from "../db/db";
import { Photo } from "../models/photo";


interface PhotoServices {
    updateLikes(id:string, inc:number): Promise<Photo>  //command + period when red line under word, will import it
    createPhoto(photo:Photo): Promise<string>;
    createComment(id:string, comment:string): Promise<Photo>
    getAllPhotos(): Promise<Photo[]>
}

const photoCollection = db.collection<Photo>("photos")

export const getAllPhotos = async (): Promise<Photo[]> => {
    const photos = await photoCollection.find().toArray()

    return photos;
};