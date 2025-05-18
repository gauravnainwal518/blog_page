import { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

function BlogEditor({ initialData = {}, onSaveDraft, onPublish }) {
  const [id, setId] = useState(initialData._id || null);
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [tags, setTags] = useState(initialData.tags?.join(", ") || "");

  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    setId(initialData._id || null);
    setTitle(initialData.title || "");
    setContent(initialData.content || "");
    setTags(initialData.tags?.join(", ") || "");
  }, [initialData]);

  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      if (title || content) {
        onSaveDraft({ id, title, content, tags })
          .then(() => toast.info("Draft auto-saved"))
          .catch((err) => {
            console.error("Auto-save failed", err);
            toast.error("Auto-save failed");
          });
      }
    }, 5000);

    return () => clearTimeout(saveTimeoutRef.current);
  }, [title, content, tags, id, onSaveDraft]);

  const handleSaveClick = async () => {
    if (!title && !content) {
      toast.warn("Cannot save empty draft");
      return;
    }
    try {
      await onSaveDraft({ id, title, content, tags });
      toast.info("Draft saved");
    } catch (error) {
      console.error("Save draft failed", error);
      toast.error("Save draft failed");
    }
  };

  const handlePublishClick = async () => {
    if (!title || !content) {
      toast.warn("Title and content are required to publish");
      return;
    }
    try {
      await onPublish({ id, title, content, tags });
      toast.success("Blog published");
    } catch (error) {
      console.error("Publish failed", error);
      toast.error("Publish failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-center">
        {id ? "Edit Blog" : "Create New Blog"}
      </h2>

      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={content}
        init={{
          height: 300,
          menubar: false,
          plugins: "link image code",
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright | code",
        }}
        onEditorChange={(newContent) => setContent(newContent)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full mt-4 p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={handleSaveClick}
          className="px-5 py-3 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition"
        >
          Save Draft
        </button>
        <button
          onClick={handlePublishClick}
          className="px-5 py-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

export default BlogEditor;
