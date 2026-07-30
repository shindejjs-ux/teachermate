"use client";

import { Pencil, Trash2 } from "lucide-react";

type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  data: Record<string, any>[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
};

export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left font-semibold"
              >
                {column.label}
              </th>
            ))}

            <th className="w-40 px-6 py-4 text-center">
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-10 text-center text-slate-500"
              >
                No records found.
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-slate-50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4"
                >
                  {row[column.key]}
                </td>
              ))}

              <td className="px-6 py-4">

                <div className="flex justify-center gap-4">

                  <button
                    onClick={() => onEdit?.(row)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete?.(row)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}