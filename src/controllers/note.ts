import { TRequest } from '../interfaces/tRequest';
import { INote } from '../interfaces/INote';
import { Request ,Response } from 'express';
import Note from '../models/Note';
import errorHandler from '../utils/error-handler';
import { ClientSession } from 'mongoose';

//TODO: fix this awful thing. Maybe re-design db structure
export async function getAllAsTree (req: Request, res: Response){
    try {
      let notes: INote[] = await Note.find().populate('user');
      notes = notes.map<INote>(note => {
        if(note.children)
        note.children = note.children.map<INote>((childId: String | INote)=>{
          let child = notes.find(n =>{
            return n._id?.toString() == childId.toString();
          });
          if(child) return child;
          else throw 'DB structure is corrupted';
        })
        return note;
      }).filter(note => !note.parent);
      res.status(200).json(notes);
    }
    catch(e) {
      errorHandler(res, e);
    }
}
export async function getAll (req: Request, res: Response){
  try {
    let notes: INote[] = await Note.find();
    res.status(200).json(notes);
  }
  catch(e) {
    errorHandler(res, e);
  }
}

export async function create(req: TRequest, res: Response){
    try {
      let note: INote = getNoteFromRequest(req);

      const session = await Note.startSession();
      await session.withTransaction(async () => {
        note = await new Note(note).save({session});
        if(note.parent) await Note.findByIdAndUpdate(
          { _id: note.parent },
          { $push: { children: [note._id] } },
          { new: true, session});
      });
      session.endSession();

      res.status(201).json(note);
    }
    catch(e) {
      errorHandler(res, e);
    }
}

function getNoteFromRequest(req: TRequest): INote {
  return req.body.isFolder ? {
    name: req.body.name,
    isFolder: true,
    user: req?.user?._id,
    date: Date.now().toString(),
    parent: req.body.parent,
    children: []
  } : {
    name: req.body.name,
    isFolder: false,
    user: req?.user?._id,
    date: Date.now().toString(),
    parent: req.body.parent,
    content: req.body.content
  }
}


export async function update (req: Request, res: Response){
    try {
      let note: INote;
      if(req.body.isFolder){
        note = await Note.findOneAndUpdate({ _id: req.body._id }, {name: req.body.name }, {new: true});
      }
      else {
        note = await Note.findOneAndUpdate({ _id: req.body._id }, {$set: req.body}, {new: true});
      }
      res.status(200).json(note);
    }
    catch(e) {
      errorHandler(res, e);
    }
}

export async function remove (req: Request, res: Response){
    try {
      const session = await Note.startSession();
      await session.withTransaction(async () => {
        await Note.updateOne(
          {children: { "$in" : [req.params.id]} },
          {$pull: {children:{_id:req.params.id}}},
          {session});
        removeRecursive(req.params.id,session);
      });
      session.endSession();
      res.status(200).json({
        message: "Removed successfully"
      });
    }
    catch(e) {
      errorHandler(res, e);
    }
}

async function removeRecursive(noteId: String, session: ClientSession){
  const note = await Note.findByIdAndRemove({ _id: noteId},{session});
  if (note.children){
    note.children.forEach((n: String) => removeRecursive(n, session))
  }
}