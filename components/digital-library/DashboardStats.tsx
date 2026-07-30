import Card from "@/components/ui/Card";
import {
  BookOpen,
  FolderOpen,
  FileText,
  Library,
} from "lucide-react";

type Props = {
  books: number;
  chapters: number;
  resources: number;
  classes: number;
};

const stats = [
  {
    key: "classes",
    title: "Classes",
    icon: Library,
    color: "text-blue-600",
  },
  {
    key: "books",
    title: "Books",
    icon: BookOpen,
    color: "text-green-600",
  },
  {
    key: "chapters",
    title: "Chapters",
    icon: FolderOpen,
    color: "text-orange-600",
  },
  {
    key: "resources",
    title: "Resources",
    icon: FileText,
    color: "text-purple-600",
  },
];

export default function DashboardStats(props: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        const value =
          props[item.key as keyof Props];

        return (
          <Card key={item.key}>
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {value}
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