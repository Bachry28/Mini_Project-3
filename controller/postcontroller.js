const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require ("path")

const postcontroller = {
    getAllpost: async (req, res) => {
        try {
            // Retrieve all posts from the database
            const posts = await prisma.post.findMany();
            res.status(200).json({ message: "Successfully fetched all posts", posts });
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({ message: "Failed to fetch posts", error });
        }
    },
    getpostById: async (req, res) => {
        try {
            const { id } = req.params;
            // Retrieve a specific post by its ID from the database
            const post = await prisma.post.findUnique({
                where: { post_id: Number(id) }
            });
            if (!post) {
                // If post with specified ID is not found, return a 404 status code
                res.status(404).json({ message: `Post with ID ${id} not found` });
                return;
            }
            res.status(200).json({ message: "Successfully fetched post by ID", post });
        } catch (error) {
            console.error("Error fetching post by ID:", error);
            res.status(500).json({ message: "Failed to fetch post by ID", error });
        }
    },
    createpost: async (req, res) => {
        try {
            const image = req.file ? req.file.path : 'default_path_if_file_not_present';
            const user_id= parseInt(req.body.user_id)
            const { title, description } = req.body;
            // Create a new post in the database
            const post = await prisma.post.create({
                data: {
                    user_id,
                    title,
                    description,
                    image
                }
            });
            res.status(201).json({ message: "Successfully created post", post: post });
        } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ message: "Failed to create post", error });
        }
    },
    updatePost: async (req, res) => {
        try {
            const image = req.file ? req.file.path : 'default_path_if_file_not_present';
            const { id } = req.params;
            const user_id = parseInt(req.body.user_id)
            const { title, description } = req.body;
            // Update an existing post in the database
            const updatedPost = await prisma.post.update({
                where: { post_id: Number(id) },
                data: {
                    user_id,
                    title,
                    description,
                    image
                }
            });
            res.status(200).json({ message: "Successfully updated post", post: updatedPost });
        } catch (error) {
            console.error("Error updating post:", error);
            res.status(500).json({ message: "Failed to update post", error });
        }
    },
    deletePost: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            // Find all comments associated with the post
            const comments = await prisma.comment.findMany({
                where: { post_id: id }
            });
            // Delete all associated comments
            await Promise.all(comments.map(async (comment) => {
                await prisma.comment.delete({
                    where: { comment_id: comment.comment_id }
                });
            }));
            // Delete the post itself
            await prisma.post.delete({
                where: { post_id: id }
            });
            res.status(200).json({ message: `Successfully deleted post with ID: ${id}` });
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).json({ message: "Failed to delete post", error });
        }
    }
    
};

module.exports = postcontroller;
