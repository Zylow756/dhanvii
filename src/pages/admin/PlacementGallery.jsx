import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from '../../components/AdminNav/AdminNav';

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },

  button: {
    backgroundColor: "#8B0000",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    textAlign: "center",
  },

  th: {
    textAlign: "center",
    padding: "12px",
    backgroundColor: "#f1f1f1",
    borderBottom: "2px solid #ddd",
    borderLeft: "2px solid #ddd",
    color:"#090909",
  },

  td: {
    padding: "12px",
    borderBottom: "3px solid #ddd",
    borderLeft: "2px solid #ddd",
    textAlign: "center",
  },

  editBtn: {
    backgroundColor: "#51e760",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const PlacementGallery = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    company: "",
    salary: "",
    photo: null,
    background: null,
  });
  const [editId, setEditId] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [bgPreview, setBgPreview] = useState(null);

  const data = new FormData();

  for (let pair of data.entries()) {
    console.log(pair[0]);
  }
  //  FETCH DATA
  const fetchData = () => {
    axios.get("http://localhost:5000/api/placementGallery")
      .then(res => setStudents(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      setFormData(prev => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
    else if (name === "background") {
      const file = files[0];
      setFormData(prev => ({ ...prev, background: file }));
      setBgPreview(URL.createObjectURL(file));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  //  SUBMIT (ADD / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("qualification", formData.qualification);
    data.append("company", formData.company);
    data.append("salary", formData.salary);

    // ONLY append if it's FILE
    if (formData.photo instanceof File) {
      data.append("photo", formData.photo);
    }

    if (formData.background instanceof File) {
      data.append("background", formData.background);
    }

    try {
      if (editId) {
        //  UPDATE
        await axios.put(
          `http://localhost:5000/api/placementGallery/${editId}`,
          data
        );
        alert("Updated");
      } else {
        //  ADD
        await axios.post(
          "http://localhost:5000/api/placementGallery",
          data, {
          headers: { "Content-Type": "multipart/form-data" }
        }
        );
        alert("Added");
      }

      setEditId(null); // reset
      fetchData();

    } catch (err) {
      console.error(err);
    }
  };

  //  EDIT
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      qualification: student.qualification,
      company: student.company,
      salary: student.salary || "",
      photo: null,
      background: null
    });
    setPhotoPreview(null);
    setBgPreview(null);
    setEditId(student._id);
    setPhotoPreview(`http://localhost:5000/${student.photo}`);
    setBgPreview(`http://localhost:5000/${student.background}`);
  };

  //  DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/placementGallery/${id}`);
    fetchData();
  };

  return (
    <div>
      <AdminNav />
      <h1>Admin Placement Gallery</h1>

      <div style={styles.card}>
        <h3>Add New Placement</h3>
        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" style={styles.input} />
          <input name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" style={styles.input} />
          <textarea name="company" value={formData.company} onChange={handleChange} placeholder="Contain with company name" style={styles.textarea} />
          <input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary per year" style={styles.input} />
          <label>Student Photo
            <input type="file" name="photo" onChange={handleChange} />
          </label>
          <label>Background Image
            <input type="file" name="background" onChange={handleChange} />
          </label>

          {/*  IMAGE PREVIEW */}
          {photoPreview && <img src={photoPreview} width="100" />}
          {bgPreview && <img src={bgPreview} width="100" />}

          <button type="submit" style={styles.button}>{editId ? "Update" : "Add"}</button>
        </form>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        <h3>All Placement</h3>
        <table border="1"
          style={styles.table}>
          <thead style={{ background: "#7b0000", color: "#fff" }}>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Qualification</th>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Salary</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td style={styles.td}>{s.name}</td>
                <td style={styles.td}>{s.qualification}</td>
                <td style={styles.td}>{s.company}</td>
                <td style={styles.td}>{s.salary}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(s)}>✏️ Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(s._id)}> 🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementGallery;