import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  Users,
  GraduationCap,
  BookOpen,
  FolderOpen,
  FileText,
  Brain,
  Library,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";


const cards = [
  {
    title: "Teachers",
    value: "0",
    icon: Users,
    href: "/admin/teachers",
    color: "bg-blue-500",
  },
  {
    title: "Students",
    value: "0",
    icon: GraduationCap,
    href: "/admin/students",
    color: "bg-green-500",
  },
  {
    title: "Books",
    value: "0",
    icon: BookOpen,
    href: "/admin/books",
    color: "bg-purple-500",
  },
  {
    title: "Chapters",
    value: "0",
    icon: FolderOpen,
    href: "/admin/chapters",
    color: "bg-orange-500",
  },
  {
    title: "Resources",
    value: "0",
    icon: FileText,
    href: "/admin/resources",
    color: "bg-red-500",
  },
  {
    title: "Question Bank",
    value: "0",
    icon: Brain,
    href: "/admin/question-bank",
    color: "bg-pink-500",
  },
  {
    title: "Digital Library",
    value: "24",
    icon: Library,
    href: "/digital-library",
    color: "bg-indigo-500",
  },
  {
    title: "Lesson Plans",
    value: "0",
    icon: ClipboardList,
    href: "/lesson-planner",
    color: "bg-cyan-500",
  },
];


export default function AdminDashboard() {

  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          TeacherMate Admin Dashboard
        </h1>


        <p className="mt-2 text-slate-500">
          Welcome to your AI Powered Teaching Platform.
        </p>


      </div>





      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card)=>(

          <DashboardCard

            key={card.title}

            title={card.title}

            value={card.value}

            icon={card.icon}

            href={card.href}

            color={card.color}

          />

        ))}

      </div>





      <div className="grid gap-6 lg:grid-cols-2">


        <div className="rounded-xl bg-white p-6 shadow">


          <h2 className="mb-4 text-xl font-semibold">
            Quick Actions
          </h2>



          <div className="grid gap-3">


            <Link
              href="/admin/resources"
              className="rounded-lg bg-blue-600 px-4 py-3 text-center text-white hover:bg-blue-700"
            >
              Add New Resource
            </Link>



            <Link
              href="/admin/books"
              className="rounded-lg bg-green-600 px-4 py-3 text-center text-white hover:bg-green-700"
            >
              Add New Book
            </Link>



            <Link
              href="/admin/chapters"
              className="rounded-lg bg-purple-600 px-4 py-3 text-center text-white hover:bg-purple-700"
            >
              Add Chapter
            </Link>



            <Link
              href="/admin/question-bank"
              className="rounded-lg bg-orange-600 px-4 py-3 text-center text-white hover:bg-orange-700"
            >
              Create Question Bank
            </Link>



            <Link
              href="/lesson-planner"
              className="rounded-lg bg-cyan-600 px-4 py-3 text-center text-white hover:bg-cyan-700"
            >
              Create Lesson Plan
            </Link>


          </div>


        </div>





        <div className="rounded-xl bg-white p-6 shadow">


          <h2 className="mb-4 text-xl font-semibold">
            System Status
          </h2>



          <div className="space-y-3 text-sm">


            <div className="flex justify-between">
              <span>Supabase</span>

              <span className="font-semibold text-green-600">
                Connected
              </span>

            </div>



            <div className="flex justify-between">

              <span>Next.js</span>

              <span className="font-semibold text-green-600">
                Running
              </span>

            </div>




            <div className="flex justify-between">

              <span>Digital Library</span>

              <span className="font-semibold text-green-600">
                Active
              </span>

            </div>




            <div className="flex justify-between">

              <span>AI Engine</span>

              <span className="font-semibold text-yellow-600">
                Under Development
              </span>

            </div>



          </div>


        </div>


      </div>


    </div>

  );

}