export const getAllBlogs = (req, res) => {
    res.send('All Posts')
}
export const createBlog = (req, res) => {
    res.json(req.body)
}
export const updateBlog = (req, res) => {
    res.send('updateBlog')
}
export const deleteBlog = (req, res) => {
    res.send('deleteBlog')
}


   