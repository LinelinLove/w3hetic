import express from "express";

const apiUserRouter = express.Router()

apiUserRouter.param('id', (req, res, next, id) => {
    console.log(id)
    req.user = id
    next()
})

apiUserRouter
    .route('/')
    .get((req, res) => {
        res.json({
            message: "Get all users"
        })
    })
    .post((req, res) => {
        res.json({
            message: "Add new user"
        })
    })

apiUserRouter
    .route('/:id(\\d+)')
    .get((req, res) => {
        res.json({
            message: `Get user #${req.params.id}`
        })
    })
    .patch((req, res) => {
        res.json({
            message: `Update user #${req.params.id}`
        })
    })
    .delete((req, res) => {
        res.json({
            message: `Delete user #${req.params.id}`
        })
    })


export default apiUserRouter;