import express from 'express'

const router = express.Router();

//Clearing out JWT token from cookies and redirecting to homepage
router.get("/", (req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .redirect('/');
});

export default router;