import { useEffect, useState } from "react";
import { getAllBlogs } from "../services/api";
import BlogList from "../components/BlogList";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [showSection, setShowSection] = useState("published");

  useEffect(() => {
    getAllBlogs().then((res) => setBlogs(res.data));
  }, []);

  const drafts = blogs.filter((b) => b.status === "draft");
  const published = blogs.filter((b) => b.status === "published");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans px-6 py-12 max-w-6xl mx-auto text-center">
      {/* Centered Welcome Message */}
      <h1 className="font-extrabold text-5xl mb-10">
        Every great story starts here. Welcome back!
      </h1>

      {/* Centered Buttons */}
      <div className="mb-12 flex justify-center space-x-6">
        <button
          onClick={() => setShowSection("published")}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-shadow duration-300
            ${
              showSection === "published"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-400/50"
                : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
        >
          Published Blogs
        </button>

        <button
          onClick={() => setShowSection("drafts")}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-shadow duration-300
            ${
              showSection === "drafts"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-400/50"
                : "bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
        >
          Drafts
        </button>
      </div>

      {/* Blog sections */}
      {showSection === "published" && (
        <section className="text-left">
          <h2 className="font-semibold text-2xl border-b-4 border-blue-600 pb-2 mb-6">
            Published Blogs
          </h2>
          <BlogList blogs={published} />
        </section>
      )}

      {showSection === "drafts" && (
        <section className="text-left">
          <h2 className="font-semibold text-2xl border-b-4 border-gray-600 pb-2 mb-6">
            Drafts
          </h2>
          <BlogList blogs={drafts} />
        </section>
      )}
    </div>
  );
}

export default Home;
