import express from 'express'

const router = express.Router();

router.get("/", (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .redirect('/');
});

export default router;