import Link from "next/link";
import ResourceIcon from "./ResourceIcon";

type Resource = {
  id: number;
  title: string;
  resource_type: string;
  file_url: string | null;
};

type Props = {
  resources: Resource[];
};

export default function ResourceList({
  resources,
}: Props) {
  if (resources.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 shadow text-center">
        <h2 className="text-2xl font-bold">
          No Resources Available
        </h2>

        <p className="mt-3 text-slate-500">
          Resources will appear here once uploaded.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white shadow overflow-hidden">

      <div className="border-b px-8 py-6">

        <h2 className="text-3xl font-bold">
          Chapter Resources
        </h2>

      </div>

      <div className="divide-y">

        {resources.map((resource) => (

          <div
            key={resource.id}
            className="flex items-center justify-between p-6 hover:bg-slate-50 transition"
          >

            <div className="flex items-center gap-5">

              <ResourceIcon
                type={resource.resource_type}
                className="h-8 w-8 text-indigo-600"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  {resource.title}
                </h3>

                <p className="text-slate-500 capitalize">
                  {resource.resource_type.replaceAll("_", " ")}
                </p>

              </div>

            </div>

            {resource.file_url ? (

              <div className="flex gap-3">

                <Link
                  href={`/pdf-viewer?url=${encodeURIComponent(resource.file_url)}`}
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                >
                  Open
                </Link>

                <Link
                  href={resource.file_url}
                  target="_blank"
                  className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                >
                  Download
                </Link>

              </div>

            ) : (

              <span className="rounded-lg bg-slate-200 px-4 py-2 text-slate-600">
                Coming Soon
              </span>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}