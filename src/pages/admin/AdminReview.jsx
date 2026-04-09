import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from '../../components/AdminNav/AdminNav';

const styles = {
    container: {
        padding: "30px",
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
    },

    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },

    card: {
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
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
    },

    th: {
        textAlign: "center",
        padding: "12px",
        backgroundColor: "#f1f1f1",
        borderBottom: "2px solid #ddd",
        borderLeft: "2px solid #ddd",
    },

    td: {
        padding: "12px",
        borderBottom: "3px solid #ddd",
        borderLeft: "2px solid #ddd",
        textAlign: "center",
    },

    image: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
    },

    status: {
        padding: "5px 12px",
        borderRadius: "20px",
        color: "#fff",
        fontSize: "12px",
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

const AdminReview = () => {
    const [reviews, setReviews] = useState([]);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        name: "",
        message: "",
        path: "",
        qualification: "",
        image: null,
    });

    const fetchReviews = async () => {
        const res = await axios.get("http://localhost:5000/api/reviews");
        setReviews(res.data);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchReviews();
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };

        loadData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("message", form.message);
        formData.append("path", form.path);
        formData.append("qualification", form.qualification);

        // only add image if selected
        if (form.image) {
            formData.append("image", form.image);
        }

        try {
            if (editId) {
                await axios.put(
                    `http://localhost:5000/api/reviews/${editId}`,
                    formData
                );
                setEditId(null);
            } else {
                await axios.post(
                    "http://localhost:5000/api/reviews",
                    formData
                );
            }

            setForm({ name: "", message: "", path: "", qualification: "", image: null });
            fetchReviews();

        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleEdit = (review) => {
        setForm({
            name: review.name,
            message: review.message,
            path: review.path,
            qualification: review.qualification,
            image: null,
        });
        setEditId(review._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await axios.delete(
                `http://localhost:5000/api/reviews/${id}`
            );
            fetchReviews();
        }
    };

    return (
        <div style={styles.container}>
                        <AdminNav />
            <h2 style={styles.title}>Admin Review Panel</h2>

            {/* FORM CARD */}
            <div style={styles.card}>
                <h3>Add New Review</h3>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Student Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        style={styles.input}
                    />

                    <textarea
                        placeholder="Write review message..."
                        value={form.message}
                        onChange={(e) =>
                            setForm({ ...form, message: e.target.value })
                        }
                        style={styles.textarea}
                    />

                    <input
                        type="text"
                        placeholder="Write review path in google map"
                        value={form.path}
                        onChange={(e) =>
                            setForm({ ...form, path: e.target.value })
                        }
                        style={styles.path}
                    />

                    <input
                        type="text"
                        placeholder="Student Qualifications"
                        value={form.qualification}
                        onChange={(e) =>
                            setForm({ ...form, qualification: e.target.value })
                        }
                        style={styles.input}
                    />

                    <input
                        type="file"
                        onChange={(e) =>
                            setForm({ ...form, image: e.target.files[0] })
                        }
                    />
                    <button type="submit" style={styles.button}>
                        {editId ? "Update Review" : "Upload Review"}
                    </button>
                </form>
            </div>

            {/* TABLE CARD */}
            <div style={styles.card}>
                <h3>All Reviews</h3>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Message</th>
                            <th style={styles.th}>Qualification</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reviews.map((r) => (
                            <tr key={r._id}>
                                <td style={styles.td}>
                                    <img
                                        src={`http://localhost:5000/uploads/${r.image}`}
                                        alt=""
                                        style={styles.image}
                                    />
                                </td>

                                <td style={styles.td}>{r.name}</td>
                                <td style={styles.td}>{r.message}</td>
                                <td style={styles.td}>{r.qualification}</td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => handleEdit(r)}
                                        style={styles.editBtn}
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(r._id)}
                                        style={styles.deleteBtn}
                                    >
                                        🗑 Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminReview;