import { Link } from "react-router-dom";
import { useBlogs, useCurrentUser } from "../store";

const MainPage = () => {
  const blogs = useBlogs();
  const user = useCurrentUser();

  return (
    <div className="app">
      <div>
        <h2>blogs</h2>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id}>
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </li>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainPage;
