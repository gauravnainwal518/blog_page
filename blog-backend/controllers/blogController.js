const Blog = require('../models/Blog');

exports.saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const parsedTags = tags ? tags.split(",").map((t) => t.trim()) : [];

    let blog;

    if (id) {
      blog = await Blog.findById(id);

      if (blog) {
        blog.title = title;
        blog.content = content;
        blog.tags = parsedTags;
        blog.status = "draft";
        await blog.save();
      } else {
        // fallback if id was invalid or deleted
        blog = new Blog({
          title,
          content,
          tags: parsedTags,
          status: "draft",
        });
        await blog.save();
      }
    } else {
      blog = new Blog({
        title,
        content,
        tags: parsedTags,
        status: "draft",
      });
      await blog.save();
    }

    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.publishBlog = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    let blog;

    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags: tags ? tags.split(',').map(t => t.trim()) : [], status: 'published' },
        { new: true }
      );
    } else {
      blog = new Blog({
        title,
        content,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        status: 'published',
      });
      await blog.save();
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
