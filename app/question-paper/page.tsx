"use client";

import { useState } from "react";

export default function QuestionPaperPage() {
  const [paper, setPaper] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePaper() {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setPaper(`

THE ADITYA BIRLA PUBLIC SCHOOL

Class IX

Subject : Mathematics

Time : 2 Hours

Maximum Marks : 40

----------------------------------------

Section A

1. Define Rational Numbers. (2)

2. State the properties of Rational Numbers. (2)

3. Find additive inverse of -5/7. (2)

4. Simplify 3/5 + 4/7. (2)

----------------------------------------

Section B

5. Solve:
5/8 - 7/16 (3)

6. Word Problem (3)

7. Represent Rational Number on Number Line (3)

----------------------------------------

Section C

8. Long Answer (5)

9. HOTS Question (5)

10. Case Study (8)

`);
    setLoading(false);
  }

  function printPaper() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-red-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          📄 AI Question Paper Generator
        </h1>

        <p className="mt-2 text-red-100">
          Generate CBSE Question Papers instantly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <button
            onClick={generatePaper}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold"
          >
            {loading ? "Generating..." : "Generate Paper"}
          </button>

          {paper && (
            <button
              onClick={printPaper}
              className="ml-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold"
            >
              Print / Save PDF
            </button>
          )}

        </div>

        {paper && (

          <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

            <pre className="whitespace-pre-wrap text-lg">
              {paper}
            </pre>

          </div>

        )}

      </div>

    </div>
  );
}