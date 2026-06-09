import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    body: "",
  });

  const [updating, setUpdating] = useState(false);

  const getPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data = await response.json();

      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPosts = async (postData) => {
    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }

      const newPost = await response.json();

      setPosts((prevPosts) => [newPost, ...prevPosts]);

      setNewPost({
        title: "",
        body: "",
        userId: 1,
      });

      setShowForm(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const deletePosts = async (postId) => {
    try {
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error, status: ${response.status}`);
      }

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const editPosts = async (postId, updatePost) => {
    try {
      setUpdating(true);
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: postId,
            title: updatePost.title,
            body: updatePost.body,
            userId: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error, status: ${response.status}`);
      }

      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, ...updatedPost } : post
        )
      );

      setEditingPost(null);

      setEditForm({
        title: "",
        body: "",
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!newPost.title.trim() || !newPost.body.trim()) {
      setError("Please enter all field values");
      return;
    }

    setError(null);

    addPosts(newPost);
  };

  const handleInputChange = (field, value) => {
    setNewPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePostDelete = (post) => {
    window.confirm("Are you sure you want to delete this post?")
    if(confirm){
      deletePosts(post.id);
    }
    
  };

  const handleEditForm = (post) => {
    setEditingPost(post.id);

    setEditForm({
      title: post.title,
      body: post.body,
    });
  };

  const submitEdit = () => {
    if (!editForm.title.trim() || !editForm.body.trim()) {
      setError("Please enter all field values");
      return;
    }

    editPosts(editingPost, editForm);

    setEditForm({
      title: "",
      body: "",
    });
  };

  const cancelEdit = () => {
    setEditForm({
      title: "",
      body: "",
    });

    setEditingPost(null);
  };

  return (
    <div className="app-container">
      <h1 className="heading">Post Blogs</h1>

      <div className="post-form-container">
        <button
          className="add-post-btn"
          onClick={() => setShowForm(true)}
          disabled={showForm}
        >
          Add New Post
        </button>

        {showForm && (
          <form className="post-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Post Title
              </label>

              <input
                className="form-input"
                type="text"
                id="title"
                placeholder="Enter post title..."
                value={newPost.title}
                onChange={(e) =>
                  handleInputChange("title", e.target.value)
                }
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="body" className="form-label">
                Post Description
              </label>

              <textarea
                className="form-textarea"
                id="body"
                placeholder="Enter post description..."
                value={newPost.body}
                onChange={(e) =>
                  handleInputChange("body", e.target.value)
                }
                disabled={submitting}
              />
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="submit-btn"
                disabled={
                  submitting ||
                  !newPost.title.trim() ||
                  !newPost.body.trim()
                }
              >
                {submitting ? "Creating..." : "Create Post"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {loading && (
        <p className="loading-text">
          Loading posts...
        </p>
      )}

      {error && (
        <div className="error-box">
          <p className="error-title">
            Something went wrong
          </p>

          <p className="error-message">
            {error}
          </p>

          <button
            className="retry-btn"
            onClick={getPosts}
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="post-container">
          {posts.length === 0 ? (
            <p className="empty-text">
              No posts found
            </p>
          ) : (
            <div className="post-grid">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="post-card"
                >
                  {editingPost === post.id ? (
                    <div className="edit-form">
                      <input
                        className="edit-input"
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        disabled={updating}
                      />

                      <textarea
                        className="edit-textarea"
                        value={editForm.body}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            body: e.target.value,
                          }))
                        }
                        disabled={updating}
                      />

                      <div className="edit-button-group">
                        <button
                          className="update-btn"
                          onClick={submitEdit}
                          disabled={updating}
                        >
                          {updating
                            ? "Updating..."
                            : "Update"}
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="post-body">
                        <h3 className="post-title">
                          {post.title}
                        </h3>

                        <p className="post-description">
                          {post.body}
                        </p>

                        <small className="post-meta">
                          Post ID: {post.id} | User ID:{" "}
                          {post.userId}
                        </small>
                      </div>

                      <div className="post-actions">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEditForm(post)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handlePostDelete(post)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}