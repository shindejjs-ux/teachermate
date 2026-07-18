"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold">
          Delete Question
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete this question?
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}