import Card from "@/components/ui/Card";
import {
  Library,
  BookOpen,
  FolderOpen,
  FileText,
} from "lucide-react";

type Props = {
  classes: number;
  books: number;
  chapters: number;
  resources: number;
};

export default function DashboardStats({
  classes,
  books,
  chapters,
  resources,
}: Props) {
  const stats = [
    {
      title: "Classes",
      value: classes,
      icon: Library,
      color: "text-blue-600",
    },
    {
      title: "Books",
      value: books,
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Chapters",
      value: chapters,
      icon: FolderOpen,
      color: "text-orange-600",
    },
    {
      title: "Resources",
      value: resources,
      icon: FileText,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {item.value}
                </h2>
              </div>

              <Icon
                className={`h-10 w-10 ${item.color}`}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}