// components/GenericForm.jsx
import React, { useState } from "react";

export default function GenericForm({ fields, onSubmit, initialValues = {} }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialValues); // reset form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) =>
        field.component ? (
          <field.component
            key={field.name}
            value={formData[field.name]}
            onChange={(value) => handleChange(field.name, value)}
          />
        ) : (
          <input
            key={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
