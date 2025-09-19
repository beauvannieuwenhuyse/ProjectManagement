const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const port = 3000;

// Body parser middleware
app.use(cors());
app.use(express.json());

const config = {
    user: "sa",
    password: "root",
    server: "localhost",
    port: 1433,
    database: "ProjectManagement", // vervang dit door je database
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

sql.connect(config)
    .then((pool) => {
        console.log("✅ Verbonden met SQL Server!");

        // GET all projects
        // GET all projects met statusnaam
        app.get("/projects", async (req, res) => {
            try {
                const result = await pool.request().query(`
            SELECT p.Id, p.Name, p.Description, p.StatusId, s.StatusTitle AS StatusTitle
            FROM Projects p
            LEFT JOIN ProjectStatus s ON p.StatusID = s.ID
        `);
                res.json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).send("Database fout bij ophalen");
            }
        });

        app.get("/statuses", async (req, res) => {
            try {
                const result = await pool
                    .request()
                    .query("SELECT * FROM ProjectStatus");
                res.json(result.recordset);
            } catch (err) {
                console.error(err);
                res.status(500).send("Database fout bij ophalen");
            }
        });

        // POST new project
        // POST new project
        app.post("/projects", async (req, res) => {
            try {
                const { name, description, statusId } = req.body;

                if (!name || !description || !statusId) {
                    return res
                        .status(400)
                        .send("Vul name, description en statusId in");
                }

                const result = await pool
                    .request()
                    .input("name", sql.NVarChar, name)
                    .input("description", sql.NVarChar, description)
                    .input("statusID", sql.Int, statusId)
                    .query(
                        "INSERT INTO Projects (Name, Description, StatusId) OUTPUT INSERTED.* VALUES (@name, @description, @statusId)"
                    );

                res.status(201).json(result.recordset[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send("Database fout bij toevoegen");
            }
        });

        // Update project status
        app.put("/projects/:id/status", async (req, res) => {
            try {
                const { id } = req.params;
                const { statusId } = req.body;

                if (!statusId) {
                    return res.status(400).send("Geen statusId meegegeven");
                }

                const result = await pool
                    .request()
                    .input("id", sql.Int, id)
                    .input("statusId", sql.Int, statusId)
                    .query(
                        "UPDATE Projects SET Status = @statusId OUTPUT INSERTED.* WHERE Id = @id"
                    );

                res.json(result.recordset[0]);
            } catch (err) {
                console.error(err);
                res.status(500).send("Database fout bij updaten van status");
            }
        });

        app.listen(port, () => {
            console.log(`Server draait op http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Fout bij verbinden met de database:", err);
    });
