"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";
import { supabase } from "@/lib/supabase-browser";

export default function ImportBooksPage() {
  const router = useRouter();

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete(results) {
        setRows(results.data as any[]);
      },
    });
  }

  async function importBooks() {
    if (rows.length === 0) return;

    setLoading(true);

    const { error } = await supabase
      .from("books")
      .insert(rows);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(`${rows.length} books imported successfully`);

    router.push("/admin/books");
  }

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        📥 Import Books
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="mb-8"
        />

        {rows.length > 0 && (

          <>

            <div className="mb-6 text-lg font-semibold">

              {rows.length} Books Ready To Import

            </div>

            <div className="overflow-auto max-h-[500px] border rounded-xl">

              <table className="w-full">

                <thead className="bg-slate-100">

                  <tr>

                    {Object.keys(rows[0]).map((key) => (

                      <th
                        key={key}
                        className="p-3 text-left"
                      >
                        {key}
                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {rows.map((row, i) => (

                    <tr key={i} className="border-t">

                      {Object.values(row).map((v, j) => (

                        <td key={j} className="p-3">
                          {String(v)}
                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <button
              onClick={importBooks}
              disabled={loading}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
            >
              {loading ? "Importing..." : "Import Books"}
            </button>

          </>

        )}

      </div>

    </div>
  );
}