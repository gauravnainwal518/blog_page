import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogEditor from "../components/BlogEditor";
import { getBlogById, saveDraft, publishBlog } from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const location = useLocation();
  const [initialData, setInitialData] = useState(location.state?.blog || {});
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getBlogById(id).then((res) => setInitialData(res.data));
    }
  }, [id]);

  const handleSaveDraft = async (data) => {
    try {
      const res = await saveDraft(data);
      if (res.data && res.data._id && (!data.id || data.id !== res.data._id)) {
        setInitialData(res.data); // update initialData and id to keep sync
      }
      return res;
    } catch (error) {
      console.error("Save draft error:", error);
      throw error;
    }
  };

  const handlePublish = async (data) => {
    await publishBlog({ ...data, id });
    navigate("/");
  };

  return (
    <div>
      <h2>{id ? "Edit Blog" : "New Blog"}</h2>
      <BlogEditor
        initialData={initialData}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />
    </div>
  );
}

export default EditBlog;
