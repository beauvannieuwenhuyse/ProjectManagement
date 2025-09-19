import React from "react";
import { useParams, Link } from "react-router-dom";

const projects = [
  { id: 1, name: "Project Alpha", description: "Dit is de detailpagina van Project Alpha." },
  { id: 2, name: "Project Beta", description: "Dit is de detailpagina van Project Beta." },
  { id: 3, name: "Project Gamma", description: "Dit is de detailpagina van Project Gamma." },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h1>
        <p className="text-gray-700 mb-6">{project.description}</p>
        <Link
          to="/projects"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
