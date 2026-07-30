"use client";

import {
  Pencil,
  Trash2,
  Eye,
  FileText,
  Video,
} from "lucide-react";

export type Resource = {
  id: number;
  title: string;
  resource_type: string;
  file_url: string;
};

type Props = {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
  onPreview: (resource: Resource) => void;
};

function getTypeBadge(type: string) {
  switch (type.toLowerCase()) {
    case "pdf":
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
          📄 PDF
        </span>
      );

    case "video":
      return (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          🎥 Video
        </span>
      );

    case "worksheet":
      return (
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          📝 Worksheet
        </span>
      );

    case "notes":
      return (
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
          📚 Notes
        </span>
      );

    case "lesson_plan":
      return (
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
          📋 Lesson Plan
        </span>
      );

    default:
      return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {type}
        </span>
      );
  }
}

export default function ResourceTable({
  resources,
  onEdit,
  onDelete,
  onPreview,
}: Props) {
  if (resources.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow">
        <FileText className="mx-auto mb-4 h-12 w-12 text-slate-300" />

        <h3 className="text-lg font-semibold text-slate-700">
          No Resources Found
        </h3>

        <p className="mt-2 text-slate-500">
          Select a chapter or add a new resource.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">
              Title
            </th>

            <th className="px-4 py-3 text-left font-semibold">
              Type
            </th>

            <th className="px-4 py-3 text-center font-semibold">
              Preview
            </th>

            <th className="px-4 py-3 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {resources.map((resource) => (
            <tr
              key={resource.id}
              className="border-t hover:bg-slate-50 transition"
            >
              <td className="px-4 py-3">
                <p className="font-semibold">
                  {resource.title}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {resource.file_url}
                </p>
              </td>

              <td className="px-4 py-3">
                {getTypeBadge(resource.resource_type)}
              </td>

              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onPreview(resource)}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700"
                >
                  {resource.resource_type === "video" ? (
                    <Video size={16} />
                  ) : (
                    <Eye size={16} />
                  )}

                  Preview
                </button>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(resource)}
                    className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                    title="Edit Resource"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(resource)}
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                    title="Delete Resource"
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