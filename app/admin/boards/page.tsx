import BoardTable from "./BoardTable";

export default function BoardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Boards
        </h1>

        <p className="text-slate-500">
          Manage education boards
        </p>
      </div>

      <BoardTable />
    </div>
  );
}