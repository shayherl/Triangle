import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function ViewPage({ points }) {
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const vec = (a, b) => ({ x: b.x - a.x, y: b.y - a.y });

  const len = (v) => Math.hypot(v.x, v.y);

  const dir = (v) => Math.atan2(v.y, v.x);

  const norm = (a) => {
    let x = a % (2 * Math.PI);
    return x < 0 ? x + 2 * Math.PI : x;
  };

  const angleBetween = (u, v) => {
    const dot = u.x * v.x + u.y * v.y;
    const lu = len(u);
    const lv = len(v);
    const cos = Math.min(1, Math.max(-1, dot / (lu * lv)));
    return Math.acos(cos);
  };

  const angleDataAt = (i) => {
    const A = points[(i + 2) % 3];
    const B = points[i];
    const C = points[(i + 1) % 3];

    const BA = vec(B, A);
    const BC = vec(B, C);

    const thetaA = norm(dir(BA));
    const thetaC = norm(dir(BC));
    const ang = angleBetween(BA, BC);

    let start = thetaA;
    let end = thetaC;
    let delta = norm(end - start);
    if (delta > Math.PI) {
      [start, end] = [end, start];
      delta = norm(end - start);
    }

    const bisector = norm(start + delta / 2);

    return { B, ang, start, end, bisector };
  };

  const arcPathAt = (i, r = 28) => {
    const { B, start, end } = angleDataAt(i);
    const x1 = B.x + r * Math.cos(start);
    const y1 = B.y + r * Math.sin(start);
    const x2 = B.x + r * Math.cos(end);
    const y2 = B.y + r * Math.sin(end);

    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  const angleLabelAt = (i, r = 40) => {
    const { B, bisector } = angleDataAt(i);
    return {
      x: B.x + r * Math.cos(bisector),
      y: B.y + r * Math.sin(bisector),
    };
  };

  const angleDegAt = (i) => {
    const { ang } = angleDataAt(i);
    return toDeg(ang).toFixed(1);
  };
  return (
    <div>
      <Link to="/">Back to input</Link>
      <svg width="800" height="800">
        <polygon
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
        {points.map((_, i) => (
          <path
            key={`arc-${i}`}
            d={arcPathAt(i, 28)}
            fill="none"
            stroke="red"
            strokeWidth="3"
          />
        ))}
        {points.map((_, i) => {
          const { x, y } = angleLabelAt(i, 44);
          return (
            <text
              key={`lbl-${i}`}
              x={x}
              y={y}
              fontSize="14"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#333"
            >
              {angleDegAt(i)}°
            </text>
          );
        })}
      </svg>
    </div>
  );
}
