import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {Object} props
 * @param {string} props.title - Titel van de tabel
 * @param {Array} props.columns - Array van kolommen: { header, accessor, render? }
 * @param {Array} props.data - Array van rijen (objecten)
 * @param {string} [props.linkField] - Veld dat link wordt
 * @param {string} [props.linkPrefix="/"] - Prefix voor de link
 */
export function Table({ title, columns, data, linkField, linkPrefix = "/" }) {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="overflow-x-auto w-full rounded-lg shadow-lg border border-gray-200">
        <table className="w-full table-auto border-collapse bg-white">
          {/* Header */}
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={row.id}
                className={`${
                  rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                {columns.map((col, colIdx) => {
                  const rawValue =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : row[col.accessor];

                  return (
                    <td key={colIdx} className="px-6 py-4 text-gray-700 align-top">
                      {col.render
                        ? col.render(rawValue, row)
                        : linkField && col.accessor === linkField
                        ? (
                          <Link
                            to={`${linkPrefix}${row[linkField]}`}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {rawValue}
                          </Link>
                        )
                        : rawValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
