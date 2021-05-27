import { TRequest } from '../interfaces/tRequest';
import { INote } from '../interfaces/INote';
import { Request, Response } from 'express';
import errorHandler from '../utils/error-handler';
import Note from '../models/Note';


export async function getAll (req: Request, res: Response){
  try {
    const notes = await Note.find().populate('user');
    res.status(200).json(notes);
  } catch (e) {
    errorHandler(res, e);
  }
}

//TODO: Check if parent folder exists, populate with user before sent back
export async function create(req: TRequest, res: Response){
  try {
    const note = await new Note({
      name: req.body.name,
      isFolder: req.body.isFolder,
      content: req.body.content,
      date: Date.now().toString(),
      path: req.body.path,
      user: req.user?._id,
    }).save();
    res.status(201).json(note);
  } catch (e) {
    errorHandler(res, e);
  }
}


export async function update (req: Request, res: Response){
   try {
     const note = await Note.findByIdAndUpdate(
      {_id: req.body._id},
      {name: req.body.name, content: req.body.content},
      {new: true});
      res.status(200).json(note); 
   } catch (e) {
     errorHandler(res, e);
   }
}

//TODO: Wrap in session
export async function remove (req: Request, res: Response){
  try {
    const note = await Note.findOneAndDelete({_id: req.params.id});
    const regexp = new RegExp("^"+ note.path+note.name+"/");
    await Note.deleteMany({path: regexp});
    res.status(200).json({message: (note.isFolder ? 'Folder' : 'Note') + ' has been deleted' });
  } catch (e) {
    errorHandler(res, e);
  }
}
