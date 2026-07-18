"use client";

type Props = {
  onAdd: () => void;
  onImport: () => void;
  onExport: () => void;
};

export default function Toolbar({
  onAdd,
  onImport,
  onExport,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center bg-white rounded-2xl shadow p-4">

      <h2 className="text-2xl font-bold">
        Question Management
      </h2>

      <div className="flex gap-3">

        <button
          onClick={onAdd}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700"
        >
          ➕ Add Question
        </button>

        <button
          onClick={onImport}
          className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
        >
          📥 Import Excel
        </button>

        <button
          onClick={onExport}
          className="bg-orange-600 text-white px-5 py-3 rounded-xl hover:bg-orange-700"
        >
          📤 Export Excel
        </button>

      </div>

    </div>
  );
}