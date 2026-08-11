type Props = {
  title: string;
  subtitle?: string;
};

export default function ChapterHero({
  title,
  subtitle = "Digital Learning Hub",
}: Props) {
  return (
    <div className="bg-linear-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white">

      <div className="mx-auto max-w-7xl px-8 py-12">

        <p className="text-sm uppercase tracking-widest opacity-80">
          TeacherMate
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          {title}
        </h1>

        <p className="mt-4 max-w-3xl text-lg opacity-90">
          {subtitle}
        </p>

      </div>

    </div>
  );
}