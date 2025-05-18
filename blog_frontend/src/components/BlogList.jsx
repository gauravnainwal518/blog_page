import { Link } from "react-router-dom";

function BlogList({ blogs }) {
  if (blogs.length === 0)
    return <p className="text-center text-gray-500">No blogs available.</p>;

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border border-gray-300 rounded-lg p-4 bg-gray-100 shadow-sm"
        >
          <h3 className="mb-1 text-lg font-semibold">{blog.title}</h3>
          <p className="mb-2 text-gray-700">
            <strong>Status:</strong> {blog.status}
          </p>
          <Link
            to={`/edit/${blog._id}`}
            className="text-blue-600 font-bold hover:underline"
          >
            Edit
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
