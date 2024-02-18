const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const commentcontroller = {
    getAllcomment: async (req, res) => {
        try {
            
            const comments = await prisma.comment.findMany();
            res.status(200).json({ message: "Successfully fetched all comments", comments });
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ message: "Failed to fetch comments", error });
        }
    },
    getcommentById: async (req, res) => {
        try {
            const { id } = req.params;
           
            const comment = await prisma.comment.findUnique({
                where: { comment_id: Number(id) },
            });
            if (!comment) {
              
                res.status(404).json({ message: `Comment with ID ${id} not found` });
                return;
            }
            res.status(200).json({ message: "Successfully fetched comment by ID", comment });
        } catch (error) {
            console.error("Error fetching comment by ID:", error);
            res.status(500).json({ message: "Failed to fetch comment by ID", error });
        }
    },
    createcomment: async (req, res) => {
        try {
            const { user_id, post_id, comment } = req.body; 
       
            const newComment = await prisma.comment.create({
                data: {
                    user_id,
                    post_id,
                    comment
                },
            });
            res.status(201).json({ message: "Successfully created comment", comment: newComment });
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ message: "Failed to create comment", error });
        }
    },
    
    
    
    updatecomment: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const {  user_id, post_id, comment } = req.body;
      
            const updatedComment = await prisma.comment.update({
                where: { comment_id: id },
                data: {
                    user_id,
                    post_id,
                    comment,
                },
            });
            res.status(200).json({ message: "Successfully updated comment", comment: updatedComment });
        } catch (error) {
            console.error("Error updating comment:", error);
            res.status(500).json({ message: "Failed to update comment", error });
        }
    },
    deletecomment: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
         
            await prisma.comment.delete({
                where: { comment_id: id },
            });
            res.status(200).json({ message: `Successfully deleted comment with ID: ${id}` });
        } catch (error) {
            console.error("Error deleting comment:", error);
            res.status(500).json({ message: "Failed to delete comment", error });
        }
    },
};

module.exports = commentcontroller;
