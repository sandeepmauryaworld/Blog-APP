const blogModel = require("../models/blogModel");

// GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blog Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs List",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While getting blog",
      error,
    });
  }
};

// create blog

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    // validation
    if (!title || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Field",
      });
    }
    const newBlog = new blogModel({
      title,
      description,
      image,
    });
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created !",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: " Error While Creating Blog",
      error,
    });
  }
};

// update blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated Successfully !",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Blog",
      error,
    });
  }
};

// get single blog details

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this id ",
      });
    }

    return res.status(200).send({
      status: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting singles blog",
      error,
    });
  }
};

// delete blog
exports.deleteBlogController = async (req, res) => {
  try {
    await blogModel.findOneAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Blog Deleted !",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Deleting",
      error,
    });
  }
};
