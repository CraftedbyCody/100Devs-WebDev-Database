// const cloudinary = require("../middleware/cloudinary");
// const Post = require("../models/Post");
// const Comment = require("../models/Comment");

const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User")

module.exports = {
  getAddPost: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("add-post.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getMyPosts: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("my-posts.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("favorite-posts.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req,res)=>{
    try{
      const posts = await Post.find()
      .sort({ createdAt: 'desc' })
      .lean()
      var users = []
      for(i in posts){
        var user = await User.findById(posts[i].user)
        users.push(user.userName)
    }  
      res.render('feed.ejs', {posts: posts, userName: users,user: req.user})
    }catch(err){
      console.log(err)
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user }); 
      // comments: comments 
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        tag: req.body.tag,
        dish: req.body.dish,
        source: req.body.source.trim().split('\n'),
        directions: req.body.directions.trim().split('\n'),
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/my-posts");
    } catch (err) {
      console.log(err);
    }
  },

  likePost: async (req, res)=>{
    var liked = false
    try{
      var post = await Post.findById({_id:req.params.id})
      liked = (post.likes.includes(req.user.id))
    } catch(err){
    }
    if(liked){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'likes' : req.user.id}
          })
          
          console.log('Removed user from likes array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'likes' : req.user.id}
            })
            
            console.log('Added user to likes array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },

  favoritePost: async (req, res)=>{
    var favorited = false
    try{
      var post = await Post.findById({_id:req.params.id})
      favorited = (post.favorites.includes(req.user.id))
    } catch(err){
    }
    if(favorited){
      try{
        await Post.findOneAndUpdate({_id:req.params.id},
          {
            $pull : {'favorites' : req.user.id}
          })
          
          console.log('Removed user from favorites array')
          res.redirect('back')
        }catch(err){
          console.log(err)
        }
      }
      else{
        try{
          await Post.findOneAndUpdate({_id:req.params.id},
            {
              $addToSet : {'favorites' : req.user.id}
            })
            
            console.log('Added user to favorites array')
            res.redirect(`back`)
        }catch(err){
            console.log(err)
        }
      }
    },

  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(post.cloudinaryId);
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/feed");
    } catch (err) {
      res.redirect("/feed");
    }
  },
};
