interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-indigo-700">
        {title}
      </h1>

      <p className="text-gray-600 mt-2">
        {subtitle}
      </p>
    </div>
  );
}