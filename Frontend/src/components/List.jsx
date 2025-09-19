// components/List.jsx
import React from "react";
import ListItem from "./ListItem";

export default function List({ items, renderItem }) {
  return (
    <ul className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <ListItem key={index}>{renderItem(item)}</ListItem>
      ))}
    </ul>
  );
}
