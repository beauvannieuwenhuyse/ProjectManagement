// pages/ProjectsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../components/DynamicList";
import FormModal from "../../components/Modal";
import GenericForm from "../../components/Form";
import StatusDropdown from "../../components/StatusDropdown";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Haal projecten op bij mount
    useEffect(() => {
        fetch("http://localhost:3000/projects")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    }, []);

    const handleAddProject = async (data) => {
        try {
            const res = await fetch("http://localhost:3000/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const newProject = await res.json();
            setProjects((prev) => [...prev, newProject]);
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        {
            header: "Naam",
            accessor: "Name",
            render: (value, row) => (
                <Link
                    to={`/projects/${row.id}`}
                    className="text-blue-600 hover:underline font-medium"
                >
                    {value}
                </Link>
            ),
        },
        { header: "Beschrijving", accessor: "Description" },
        {
            header: "Status",
            accessor: "StatusTitle",
            render: (value, row) => (
                <StatusDropdown
                    value={row.Status} // huidige statusId
                    onChange={async (newStatusId) => {
                        try {
                            const res = await fetch(
                                `http://localhost:3000/projects/${row.Id}/status`,
                                {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        statusId: newStatusId,
                                    }),
                                }
                            );
                            const updated = await res.json();

                            // update frontend state
                            setProjects((prev) =>
                                prev.map((p) =>
                                    p.Id === row.Id ? { ...p, ...updated } : p
                                )
                            );
                        } catch (err) {
                            console.error("❌ Fout bij status update", err);
                        }
                    }}
                />
            ),
        },
        {
            header: "Acties",
            accessor: (row) => row.id,
            render: (value, row) => (
                <Link
                    to={`/projects/${value}`}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    View
                </Link>
            ),
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Project
                    </button>
                </div>

                <Table
                    title=""
                    columns={columns}
                    data={projects}
                    linkField="name"
                    linkPrefix="/projects/"
                />

                <FormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Add New Project"
                >
                    <GenericForm
                        fields={[
                            { name: "name", placeholder: "Project Name" },
                            {
                                name: "description",
                                placeholder: "Project Description",
                            },
                            { name: "status", component: StatusDropdown }, // nieuw veld
                        ]}
                        onSubmit={handleAddProject}
                    />
                </FormModal>
            </div>
        </div>
    );
}
