import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  FileQuestion,
  GraduationCap,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Teaching Assistant",
    description:
      "Create lesson plans, activities, explanations, worksheets and differentiated learning material in seconds.",
  },
  {
    icon: BookOpen,
    title: "Digital Library",
    description:
      "Organize classes, subjects, books, chapters and teacher resources in one searchable workspace.",
  },
  {
    icon: FileQuestion,
    title: "Assessment Studio",
    description:
      "Build quizzes, question banks and competency-focused question papers with reusable templates.",
  },
  {
    icon: GraduationCap,
    title: "CBSE Focused",
    description:
      "Designed around the everyday workflow of Classes 1–12 teachers, with curriculum-ready organization.",
  },
  {
    icon: Users,
    title: "School Ready",
    description:
      "Move from an individual teacher workspace to school-wide teacher, class and resource management.",
  },
  {
    icon: Zap,
    title: "Save Preparation Time",
    description:
      "Turn repetitive preparation work into a structured digital workflow so teachers can focus on teaching.",
  },
];

const benefits = [
  "Lesson planning and classroom activities",
  "Worksheets, quizzes and assessments",
  "Digital books and chapter resources",
  "Question bank and paper generation",
  "Teacher workspace and academic organization",
  "Built to scale from teacher to school",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 font-black shadow-lg">
              T
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">TeacherMate</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                AI for Educators
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#schools" className="transition hover:text-white">For Schools</a>
            <a href="#about" className="transition hover:text-white">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-slate-100"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,0.22),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
              <Sparkles className="h-4 w-4" />
              AI-powered teaching workspace for CBSE educators
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Teach smarter.
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Prepare faster.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              TeacherMate brings AI lesson planning, digital resources,
              worksheets, assessments and teacher productivity tools into one
              professional platform for Classes 1–12.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-7 py-4 font-bold shadow-xl shadow-blue-500/20 transition hover:bg-blue-400"
              >
                Start Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/digital-library"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Explore Library
                <BookOpen className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              {["Teacher-first design", "CBSE Classes 1–12", "Built for schools"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center">
            <div className="absolute -inset-8 rounded-[3rem] bg-blue-500/10 blur-3xl" />
            <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-900 p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <div className="text-sm text-slate-400">TeacherMate Workspace</div>
                    <div className="mt-1 text-xl font-bold">Good morning, Teacher 👋</div>
                  </div>
                  <div className="rounded-xl bg-blue-500/15 px-3 py-2 text-xs font-bold text-blue-300">
                    PRO
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["24", "Lesson Plans"],
                    ["120+", "Resources"],
                    ["46", "Students"],
                    ["35", "Worksheets"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-white/[0.05] p-4">
                      <div className="text-2xl font-black">{value}</div>
                      <div className="mt-1 text-xs text-slate-400">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 to-violet-500/10 p-5">
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-200">
                    <BrainCircuit className="h-4 w-4" />
                    AI Teaching Assistant
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    “Create a competency-based Class 9 mathematics activity on
                    linear equations.”
                  </p>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-20 text-slate-900 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              One platform
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Everything a modern teacher needs.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Replace scattered files, repetitive preparation and disconnected
              tools with one organized teaching workspace.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="schools" className="bg-slate-100 py-20 text-slate-900 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Built to scale
            </div>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              From one teacher to an entire school.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Start with your personal teaching workflow and grow into a
              school-wide academic platform with shared resources, teachers,
              classes and analytics.
            </p>
            <Link
              href="/auth/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800"
            >
              Build your workspace
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-700">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold text-slate-800">{benefit}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600">
            <GraduationCap className="h-7 w-7" />
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
            Technology that gives teachers time back.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            TeacherMate is being built as a practical, teacher-first platform:
            powerful enough for schools, simple enough to use every day.
          </p>
          <div className="mt-9">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 transition hover:bg-slate-100"
            >
              Start using TeacherMate
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-8 text-sm text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row lg:px-2">
          <span>© {new Date().getFullYear()} TeacherMate. All rights reserved.</span>
          <span>Designed for educators • Built for schools</span>
        </div>
      </footer>
    </main>
  );
}
