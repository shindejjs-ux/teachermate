"use client";

type Props = {
  difficulty: string;
  setDifficulty: (value: string) => void;
};

export default function FilterBar({
  difficulty,
  setDifficulty,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex gap-4">

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="">All Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

    </div>
  );
}