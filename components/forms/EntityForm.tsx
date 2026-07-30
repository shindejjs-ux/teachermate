"use client";

import { useEffect, useState } from "react";

export type FieldOption = {
  label: string;
  value: string;
};

export type FormField = {
  name: string;
  label: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "textarea"
    | "select"
    | "date"
    | "checkbox";

  required?: boolean;

  placeholder?: string;

  options?: FieldOption[];
};

type Props = {
  title: string;

  fields: FormField[];

  initialValues?: Record<string, any>;

  onSubmit: (values: Record<string, any>) => void;

  onCancel?: () => void;
};

export default function EntityForm({
  title,
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
}: Props) {
  const [values, setValues] =
    useState<Record<string, any>>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function updateValue(name: string, value: any) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit(values);
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      {fields.map((field) => (
        <div key={field.name}>
          <label className="mb-2 block font-medium">
            {field.label}
          </label>

          {field.type === "textarea" && (
            <textarea
              rows={4}
              value={values[field.name] ?? ""}
              onChange={(e) =>
                updateValue(field.name, e.target.value)
              }
              className="w-full rounded-lg border p-3"
            />
          )}

          {field.type === "select" && (
            <select
              value={values[field.name] ?? ""}
              onChange={(e) =>
                updateValue(field.name, e.target.value)
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="">
                Select...
              </option>

              {field.options?.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "checkbox" && (
            <input
              type="checkbox"
              checked={values[field.name] ?? false}
              onChange={(e) =>
                updateValue(field.name, e.target.checked)
              }
            />
          )}

          {(field.type === "text" ||
            field.type === "email" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === undefined) && (
            <input
              type={field.type ?? "text"}
              value={values[field.name] ?? ""}
              onChange={(e) =>
                updateValue(field.name, e.target.value)
              }
              placeholder={field.placeholder}
              className="w-full rounded-lg border p-3"
            />
          )}
        </div>
      ))}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Save
        </button>
      </div>
    </form>
  );
}