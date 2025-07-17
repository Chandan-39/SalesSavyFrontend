import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import Logo from "./Logo";
import "./assets/styles.css";
import CustomModal from "./CustomModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);
  const [response, setResponse] = useState(null);

  const cardData = [
    { title: "Add Product", modalType: "addProduct" },
    { title: "Delete Product", modalType: "deleteProduct" },
    { title: "Modify User", modalType: "modifyUser" },
    { title: "View User Details", modalType: "viewUser" },
    { title: "Monthly Business", modalType: "monthlyBusiness" },
    { title: "Day Business", modalType: "dailyBusiness" },
    { title: "Yearly Business", modalType: "yearlyBusiness" },
    { title: "Overall Business", modalType: "overallBusiness" },
  ];

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:9090/api/auth/logout", {
        method: "POST",
        credentials: "include", // important to send cookies!
      });

      if (res.ok) {
        navigate("/admin"); // or your login page route
      } else {
        const msg = await res.text();
        console.error("Logout failed:", msg);
        alert("Logout failed: " + msg);
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed: network or server error");
    }
  };

  const handleSubmit = async (data) => {
    try {
      let res;
      let url;
      let method = "POST";
      let options = { credentials: "include" };

      switch (modalType) {
        case "addProduct":
          url = "http://localhost:9090/admin/products/add";
          options = {
            ...options,
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          };
          res = await fetch(url, options);
          break;

        case "deleteProduct":
          url = "http://localhost:9090/admin/products/delete";
          options = {
            ...options,
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          };
          res = await fetch(url, options);
          break;

        case "viewUser":
          url = `http://localhost:9090/admin/user/getbyid?userId=${data.userId}`;
          res = await fetch(url, { ...options, method: "GET" });
          break;

        case "modifyUser":
          url = "http://localhost:9090/admin/user/modify";
          options = {
            ...options,
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: data.userId,
              username: data.username,
              email: data.email,
              role: data.role?.toUpperCase() || "USER",
            }),
          };
          res = await fetch(url, options);
          break;

        case "monthlyBusiness":
          url = `http://localhost:9090/admin/business/monthly?month=${data.month}&year=${data.year}`;
          res = await fetch(url, { ...options, method: "GET" });
          break;

        case "dailyBusiness":
          url = `http://localhost:9090/admin/business/daily?date=${data.date}`;
          res = await fetch(url, { ...options, method: "GET" });
          break;

        case "yearlyBusiness":
          url = `http://localhost:9090/admin/business/yearly?year=${data.year}`;
          res = await fetch(url, { ...options, method: "GET" });
          break;

        case "overallBusiness":
          url = `http://localhost:9090/admin/business/overall`;
          res = await fetch(url, { ...options, method: "GET" });
          break;

        default:
          return setResponse({ error: "Unknown modal type" });
      }

      const contentType = res.headers.get("Content-Type");
      const result = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();

      if (res.ok) {
        setResponse(result);
      } else {
        setResponse({ error: result });
      }
    } catch (error) {
      console.error("Submit error:", error);
      setResponse({ error: "Something went wrong" });
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <Logo />
        <div className="user-info">
          <span>Admin</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="cards-grid">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card"
              onClick={() => {
                setModalType(card.modalType);
                setResponse(null);
              }}
            >
              <div className="card-content">
                <h3>{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {modalType && (
        <CustomModal
          modalType={modalType}
          onClose={() => {
            setModalType(null);
            setResponse(null);
          }}
          onSubmit={handleSubmit}
          response={response}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
