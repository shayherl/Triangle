import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function InputPage({ points, setPoints }) {
  const navigate = useNavigate();

  const handleChange = (index, axis, value) => {
    const newPoints = [...points];
    newPoints[index][axis] = Number(value);
    setPoints(newPoints);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/view");
  };

  return (
    <form onSubmit={handleSubmit}>
      {points.map((p, i) => (
        <div key={i}>
          Point {i + 1} X:{" "}
          <input
            type="number"
            value={p.x}
            onChange={(e) => handleChange(i, "x", e.target.value)}
          />
          Y:{" "}
          <input
            type="number"
            value={p.y}
            onChange={(e) => handleChange(i, "y", e.target.value)}
          />
        </div>
      ))}
      <button type="submit">הצג משולש</button>
    </form>
  );
}
