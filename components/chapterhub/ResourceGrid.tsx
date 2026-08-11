import ResourceCard from "./ResourceCard";

type Resource = {
  id: number;
  title: string;
  resource_type: string;
  file_url: string | null;
};

type Props = {
  resources: Resource[];
};

function resolveUrl(url: string | null) {
  if (!url) return null;

  return `/pdf-viewer?url=${encodeURIComponent(url)}`;
}

export default function ResourceGrid({
  resources,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          title={resource.title}
          type={resource.resource_type}
          url={resolveUrl(resource.file_url)}
        />
      ))}

    </div>
  );
}