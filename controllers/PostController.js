import mongoose from 'mongoose';
import Post from '../models/Post.js' 

//GET ALL POSTS
export const getAllPosts= async (req, res)=> {
   try {
    const posts= await Post.find({ }).sort({createdAt: -1});
    res.status(200).json(posts);
   } catch (err) {
    res.status(404).json({ message: err.message })
   }
};

//GET A POST
export const getPost= async (req, res)=> {
   const {id}= req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:'post does not exist'});
   try {
      const post = await Post.findById(id);
      if(!post) return res.status(404).json({error:'post does not exist'});
      res.status(200).json(post);
   } catch (err) {
    res.status(400).json({error: err.message});
   }
};

//CREATE A POST
export const createPost= async (req, res)=> {
   const {date, title, content}= req.body;
   try {
    const post = await Post.create({date, title, content});
    res.status(200).json(post);
   } catch (err) {
    res.status(400).json({error:err.message});
   }
};


//DELETE A POST
export const deletePost= async (req, res)=> {
   const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:'post does not exist'});
   try {
     const post = await Post.findById(id);
     if(!post) return res.status(404).json({error:'post does not exist'});
     const deletePost = await Post.findByIdAndDelete({ _id: id});
     res.status(200).json({message: 'post deleted successfully'});
   } catch (err) {
    res.status(400).json({error:err.message});
   }
};


//UPDATE A POST
export const updatePost= async (req, res)=> {
    const {id}=req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:'post does not exist'});
   try {
     const post = await Post.findById(id);
     if(!post) return res.status(404).json({error:'post does not exist'});
     const updatedPost = await Post.findByIdAndUpdate({ _id: id}, { ...req.body});
     res.status(200).json(updatedPost);
   } catch (err) {
    res.status(400).json({error:err.message});
   }
};
