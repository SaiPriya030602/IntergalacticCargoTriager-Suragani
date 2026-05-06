import { useState, useEffect } from "react";

function App() {
  const [cargo, setCargo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/cargo")
      .then((res) => res.json())
      .then((data) => {
        setCargo(sortCargo(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cargo:", err);
        setLoading(false);
      });
  };

  // Sorting Logic — Heaviest to Lightest, Earth always at bottom
  const sortCargo = (data) => {
    const earth = data.filter((item) =>
      item.destination.toLowerCase() === "earth"
    );
    const others = data.filter((item) =>
      item.destination.toLowerCase() !== "earth"
    );
    others.sort((a, b) => b.weight_kg - a.weight_kg);
    return [...others, ...earth];
  };

  // Sync Button Logic — exactly 2.5 seconds
  const handleSync = () => {
    setSyncing(true);
    fetchData();
    setTimeout(() => {
      setSyncing(false);
    }, 2500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Intergalactic Cargo Triager</h1>


      <button
        onClick={handleSync}
        disabled={syncing}
        style={syncing ? styles.buttonSyncing : styles.button}
      >
        {syncing ? "Aligning quantum drives..." : "Sync Data"}
      </button>

      {loading ? (
        <p style={styles.loading}>Loading cargo data...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Cargo ID</th>
              <th style={styles.th}>Destination</th>
              <th style={styles.th}>Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {cargo.map((item, index) => (
              <tr
                key={item.id}
                style={
                  item.destination.toLowerCase() === "earth"
                    ? styles.earthRow
                    : index % 2 === 0
                    ? styles.rowEven
                    : styles.rowOdd
                }
              >
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>
                  {item.destination.toLowerCase() === "earth"
                    ? "🌍 " + item.destination + ""
                    : "📦 " + item.destination}
                </td>
                <td style={styles.td}>{item.weight_kg} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 50%, #0a0a2e 100%)",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "8px",
    background: "linear-gradient(90deg, #00d4ff, #7b2ff7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 30px",
    fontSize: "1rem",
    background: "linear-gradient(90deg, #00d4ff, #7b2ff7)",
    color: "white",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  buttonSyncing: {
    padding: "12px 30px",
    fontSize: "1rem",
    background: "#444",
    color: "#aaa",
    border: "none",
    borderRadius: "25px",
    cursor: "not-allowed",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  loading: {
    color: "#aaa",
    fontSize: "1.2rem",
  },
  table: {
    width: "90%",
    margin: "0 auto",
    borderCollapse: "collapse",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 0 30px rgba(0, 212, 255, 0.2)",
  },
  th: {
    background: "linear-gradient(90deg, #00d4ff22, #7b2ff722)",
    padding: "15px 20px",
    fontSize: "0.9rem",
    letterSpacing: "1px",
    textTransform: "uppercase",
    borderBottom: "1px solid #333",
    color: "#00d4ff",
  },
  td: {
    padding: "14px 20px",
    borderBottom: "1px solid #222",
    fontSize: "0.95rem",
  },
  rowEven: {
    background: "rgba(255,255,255,0.03)",
  },
  rowOdd: {
    background: "rgba(255,255,255,0.07)",
  },
  earthRow: {
    background: "rgba(0, 212, 100, 0.1)",
    borderLeft: "3px solid #00d464",
  },
};

export default App;