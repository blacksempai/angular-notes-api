import express from 'express';
import Note from '../models/Note';
import errorHandler from '../utils/error-handler';


export function getAll (req: express.Request, res: express.Response){
    res.status(200).json(
        [
            {
              name: 'components',
              type: 'folder',
              children: [
                {
                  name: 'src',
                  type: 'folder',
                  children: [
                    {
                      name: 'cdk',
                      type: 'folder',
                      children: [
                        { name: 'package.json', type: 'file', content: '{"name":"angular-notes"}' },
                        { name: 'BUILD.bazel', type: 'file', content: 'dafakIsBazel?' },
                      ]
                    },
                    { name: 'material', type: 'folder' }
                  ]
                }
              ]
            },
            {
              name: 'angular',
              type: 'folder',
              children: [
                {
                  name: 'packages',
                  type: 'folder',
                  children: [
                    { name: '.travis.yml', type: 'file', content: "trafisssss" },
                    { name: 'firebase.json', type: 'file', content: "firebase is the best" }
                  ]
                },
                { name: 'package.json', type: 'file', content: '{"name":"angular-notes"}' }
              ]
            },
            {
              name: 'angularjs',
              type: 'folder',
              children: [
                { name: 'gulpfile.js', type: 'file', content: 'gulp' },
                { name: 'README.md', type: 'file', content: 'Angular Notes App' }
              ]
            }
          ]
    );
}

export function create (req: express.Request, res: express.Response){
    res.status(200).json({
        name: req.body.name,
        type: req.body.type,
    });
}

export function update (req: express.Request, res: express.Response){
    res.status(200).json({
        note: true
    });
}

export function remove (req: express.Request, res: express.Response){
    res.status(200).json({
        note: true
    });
}