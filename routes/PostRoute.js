import express from 'express';
import {getAllPosts, getPost, deletePost, updatePost, createPost} from '../controllers/PostController.js';

const router=express.Router();
router.get('/:id',getPost);
router.get('/',getAllPosts);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
export default router;