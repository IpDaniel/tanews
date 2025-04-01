import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "../styles/AdminAddArticle.css";
import { useNavigate } from "react-router";

const AdminAddArticle = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [readTime, setReadTime] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [authors, setAuthors] = useState([]); // State to hold authors data
  const [selectedAuthors, setSelectedAuthors] = useState([]); // State for selected author
  const [categories, setCategories] = useState("");
  const [headURL, setURL] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTimeout(() => navigate("/login"), 0);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users/isadmin", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.message);
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users/authors", {
          method: "GET",
        });
        const data = await response.json();

        if (response.ok) {
          setAuthors(data.authors);
        } else {
          setError("Failed to load authors.");
        }
      }
      catch (err) {
        setError(err.message);
      }
    }


    fetchUserData();
    fetchAuthors();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      title,
      read_time: readTime, // Convert to snake_case
      publish_date: publishDate, // Convert to snake_case
      authors: selectedAuthors,
      categories,
      head_url: headURL, // Convert to snake_case
      text: content, // Backend expects `text` instead of `content`
    };

    console.log("Submitting article data:", articleData); // Log data before sending


    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
      const response = await fetch("http://localhost:4000/api/articles/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        alert("Article added successfully!");
        setTitle("");
        setHeadline("");
        setReadTime("");
        setPublishDate("");
        // setAuthors("");
        setCategories("");
        setURL("");
        setContent("");
        setSelectedAuthors([]); // Reset selected authors

      } else {
        const data = await response.json();
        setError(data.message || "Failed to add article.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAuthorChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedAuthors(selected);
  };


  return (
    <>
      <TopNav />
      <div className="add-article-container">
        <h2>Add New Article</h2>
        {error && <p className="error-message-admin">{error}</p>}
        {user ? (
          <form className="add-article-form" onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* <label>Headline:</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              required
            /> */}

            <label>Read Time (minutes):</label>
            <input
              type="number"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              required
            />

            <label>Publish Date:</label>
            <input
              type="date"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              required
            />


            <label>Authors:</label>
            <select multiple value={selectedAuthors} onChange={handleAuthorChange} required>
              {authors.map((author) => (
                <option key={author.user_id} value={author.user_id}>
                  {author.name}
                </option>
              ))}
            </select>


            <label>Categories:</label>
            <input
              type="text"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
            />

            <label>Head URL:</label>
            <input
              type="text"
              value={headURL}
              onChange={(e) => setURL(e.target.value)}
              required
            />

            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button type="submit">Add Article</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default AdminAddArticle;

// import React, { useState } from "react";

// const TestCorsPost = () => {
//   const [response, setResponse] = useState("");
//   const [error, setError] = useState("");

//   const testCorsPostRequest = async () => {
//     try {
//       const payload = { message: "Hello from the frontend!" }; // Sample payload
//       const response = await fetch("http://localhost:4000/api/test-cors-post", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // Ensure backend sees this header
//         },
//         body: JSON.stringify(payload), // Send JSON payload
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();
//       setResponse(data.response); // Set response message
//       setError(""); // Clear any previous errors
//     } catch (err) {
//       setError(err.message);
//       setResponse(""); // Clear previous responses
//     }
//   };

//   return (
//     <div>
//       <h2>CORS POST Test</h2>
//       <button onClick={testCorsPostRequest}>Test POST CORS</button>
//       {response && <p style={{ color: "green" }}>{response}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default TestCorsPost;
