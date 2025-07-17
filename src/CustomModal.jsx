import React, { useState, useEffect } from "react";
import "./assets/modalStyles.css";

const numericFields = [
  "userId",
  "month",
  "year",
  "price",
  "stock",
  "categoryId",
  "productId",
];

const CustomModal = ({ modalType, onClose, onSubmit, response }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (response?.user && modalType === "modifyUser") {
      setFormData(response.user);
    }
  }, [response, modalType]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        numericFields.includes(name)
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const renderForm = () => {
    switch (modalType) {
      case "addProduct":
        return (
          <>
            <input
              name="name"
              placeholder="Name"
              value={formData.name || ""}
              onChange={handleChange}
            />
            <input
              name="description"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <input
              name="price"
              placeholder="Price"
              type="number"
              value={formData.price || ""}
              onChange={handleChange}
            />
            <input
              name="stock"
              placeholder="Stock"
              type="number"
              value={formData.stock || ""}
              onChange={handleChange}
            />
            <input
              name="categoryId"
              placeholder="Category ID"
              type="number"
              value={formData.categoryId || ""}
              onChange={handleChange}
            />
            <input
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl || ""}
              onChange={handleChange}
            />
          </>
        );

      case "deleteProduct":
        return (
          <input
            name="productId"
            placeholder="Product ID"
            type="number"
            value={formData.productId || ""}
            onChange={handleChange}
          />
        );

      case "viewUser":
        return (
          <input
            name="userId"
            placeholder="User ID"
            type="number"
            value={formData.userId || ""}
            onChange={handleChange}
          />
        );

      case "modifyUser":
        return (
          <>
            <input
              name="userId"
              placeholder="User ID"
              type="number"
              value={formData.userId || ""}
              onChange={handleChange}
            />
            <input
              name="username"
              placeholder="Username"
              value={formData.username || ""}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <input
              name="role"
              placeholder="Role"
              value={formData.role || ""}
              onChange={handleChange}
            />
          </>
        );

      case "monthlyBusiness":
        return (
          <>
            <input
              name="month"
              placeholder="Month (1-12)"
              type="number"
              value={formData.month || ""}
              onChange={handleChange}
            />
            <input
              name="year"
              placeholder="Year"
              type="number"
              value={formData.year || ""}
              onChange={handleChange}
            />
          </>
        );

      case "dailyBusiness":
        return (
          <input
            name="date"
            placeholder="YYYY-MM-DD"
            type="date"
            value={formData.date || ""}
            onChange={handleChange}
          />
        );

      case "yearlyBusiness":
        return (
          <input
            name="year"
            placeholder="Year"
            type="number"
            value={formData.year || ""}
            onChange={handleChange}
          />
        );

      case "overallBusiness":
        return <p>No input needed for overall business report.</p>;

      default:
        return <p>Unknown modal type</p>;
    }
  };

  const renderResponse = () => {
    if (!response) return null;
    if (response.error)
      return (
        <p style={{ color: "red" }}>Error: {JSON.stringify(response.error)}</p>
      );
    return <pre>{JSON.stringify(response, null, 2)}</pre>;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{modalType.replace(/([A-Z])/g, " $1").trim()}</h3>
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          {renderForm()}
          <div style={{ marginTop: "1em" }}>
            <button type="submit">Submit</button>{" "}
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
        {renderResponse()}
      </div>
    </div>
  );
};

export default CustomModal;
