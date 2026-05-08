export default function AccessDenied() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "red" }}>🚫 Access Denied</h1>
      <p>You do not have permission to view this page.</p>
    </div>
  );
}