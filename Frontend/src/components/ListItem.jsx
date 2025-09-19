// components/ListItem.jsx
import React from "react";

export default function ListItem({ children, actions }) {
  return (
    <li className="py-4 flex justify-between items-center">
      <div>{children}</div>
      {actions && <div>{actions}</div>}
    </li>
  );
}
