import express from 'express'

export default (res: express.Response, err: Error) => {
    res.status(500).json({
        success: false,
        error: err.message ? err.message : err
    });
}