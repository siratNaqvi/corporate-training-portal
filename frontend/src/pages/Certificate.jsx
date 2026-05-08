import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/certificates.css";

export default function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const res = await API.get("/training/certificates");
      setCerts(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cert-page">

      <div className="cert-header">
        <h1>🎓 My Certificates</h1>
        <p>All your completed trainings and achievements</p>
      </div>

      {certs.length === 0 ? (
        <div className="empty-state">
          <h3>No Certificates Yet</h3>
          <p>Complete trainings to earn certificates</p>
        </div>
      ) : (
        <div className="cert-grid">

          {certs.map((c) => (
            <div key={c.id} className="cert-card">

              <div className="cert-icon">🏆</div>

              <div className="cert-content">
                <h2>{c.title}</h2>

                <p>
                  <span>Issued:</span>{" "}
                 {new Date(c.issued_date || c.issued_at).toLocaleDateString()}
                </p>

                <p className="cert-badge">✔ Completed</p>
              </div>
<button
  className="cert-btn"
  onClick={async () => {
    try {
      const res = await API.get(
        `/training/certificate/${c.id}`,
        {
          responseType: "blob", // 🔥 IMPORTANT
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
     link.setAttribute("download", `${c.title}.pdf`);

      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.log(err);
      alert("Download failed");
    }
  }}
>
  Download Certificate
</button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}