const express = require("express");

const router = express.Router();

let db;

// Receive database connection
router.setDB = (database) => {
  db = database;
};


// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await db.all(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await db.get(
      "SELECT * FROM posts WHERE id = ?",
      [req.params.id]
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(post);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Create a post
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await db.run(
      "INSERT INTO posts (title, content) VALUES (?, ?)",
      [title, content]
    );

    res.json({
      id: result.lastID,
      title,
      content
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update a post
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await db.run(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?",
      [title, content, req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json({
      message: "Post updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const result = await db.run(
      "DELETE FROM posts WHERE id = ?",
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json({
      message: "Post deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;