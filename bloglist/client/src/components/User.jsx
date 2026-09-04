import { useUsers, useBlogs } from "../store";
import { Link, useParams } from "react-router-dom";
const User = () => {
  const users = useUsers();
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  const blogs = user.blogs;

  return (
    <div className="userCard">
      <h2>{user.name}</h2>
      {blogs.length === 0 ? (
        <p style={{ fontSize: 20 }}>No added blogs yet</p>
      ) : (
        <p style={{ fontSize: 20 }}>added blogs</p>
      )}

      {blogs.map((blog) => (
        <div key={blog.id}>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        </div>
      ))}
    </div>
  );
};

export default User;
