"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Class = {
  id: number;
  class_name: string;
};

type Subject = {
  id: number;
  subject_name: string;
};

type Book = {
  id: number;
  title: string;
};

type Chapter = {
  id: number;
  title: string;
  chapter_no: number;
};

type Resource = {
  id: number;
  chapter_id: number;
  title: string;
  resource_type: string;
  file_url: string;
};

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);

  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [bookId, setBookId] = useState("");
  const [chapterId, setChapterId] = useState("");

  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] =
    useState("chapter_pdf");

  const [fileUrl, setFileUrl] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClasses();
    loadResources();
  }, []);

  useEffect(() => {
    if (classId) {
      loadSubjects();
    }
  }, [classId]);

  useEffect(() => {
    if (subjectId) {
      loadBooks();
    }
  }, [subjectId]);

  useEffect(() => {
    if (bookId) {
      loadChapters();
    }
  }, [bookId]);

  async function loadClasses() {
    const { data } = await supabase
      .from("classes")
      .select("id,class_name")
      .order("id");

    setClasses(data || []);
  }

  async function loadSubjects() {
    const { data } = await supabase
      .from("subjects")
      .select("id,subject_name")
      .eq("class_id", classId)
      .order("subject_name");

    setSubjects(data || []);
  }

  async function loadBooks() {
    const { data } = await supabase
      .from("books")
      .select("id,title")
      .eq("subject_id", subjectId)
      .order("title");

    setBooks(data || []);
  }

  async function loadChapters() {
    const { data } = await supabase
      .from("chapters")
      .select("id,title,chapter_no")
      .eq("book_id", bookId)
      .order("chapter_no");

    setChapters(data || []);
  }
function generatePdfPath(
  classId: string,
  bookId: string,
  chapterId: string
) {
  if (!classId || !bookId || !chapterId) return "";

  const folders: Record<number, string> = {
    1: "ganita-manjari",
    2: "rd-sharma",
    3: "rs-aggarwal",
    4: "ncert-exemplar",
    5: "together-with",
    6: "science",
    7: "english",
    8: "social-science",
    9: "hindi",
    10: "sanskrit",
    11: "art",
    12: "physical-education",
  };

  const folder = folders[Number(bookId)];

  if (!folder) return "";

  return `/pdfs/class${classId}/${folder}/ch${chapterId}.pdf`;
}
useEffect(() => {
  if (classId && bookId && chapterId) {
    setFileUrl(
      generatePdfPath(classId, bookId, chapterId)
    );
  }
}, [classId, bookId, chapterId]);
  async function loadResources() {
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("id", {
        ascending: false,
      });

    setResources(data || []);
  }

  async function saveResource() {
    if (!chapterId || !title || !fileUrl) {
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("resources").insert({
      chapter_id: Number(chapterId),
      title,
      resource_type: resourceType,
      file_url: fileUrl,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }

    setTitle("");
    setFileUrl("");
    setResourceType("chapter_pdf");
    setChapterId("");

    await loadResources();
  }

  async function deleteResource(id: number) {
    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    await loadResources();
  }
useEffect(() => {
  if (!chapterId) return;

  const chapter = chapters.find(
    (c) => c.id === Number(chapterId)
  );

  if (!chapter) return;

  const names: Record<string, string> = {
    chapter_pdf: "Chapter PDF",
    notes: "Notes",
    worksheet: "Worksheet",
    ppt: "PPT",
    question_bank: "Question Bank",
    lesson_plan: "Lesson Plan",
    video: "Video",
  };

  setTitle(
    `${chapter.title} - ${names[resourceType]}`
  );
}, [chapterId, resourceType, chapters]);
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesSearch =
        r.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        r.resource_type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [resources, search, filter]);

  const totalResources = resources.length;

  const totalPDF = resources.filter(
    (r) => r.resource_type === "chapter_pdf"
  ).length;

  const totalNotes = resources.filter(
    (r) => r.resource_type === "notes"
  ).length;

  const totalWorksheet = resources.filter(
    (r) => r.resource_type === "worksheet"
  ).length;
  return (
<div className="min-h-screen bg-slate-100">

<div className="max-w-7xl mx-auto p-8">

{/* Header */}

<div className="flex justify-between items-center mb-8">

<div>

<h1 className="text-4xl font-bold">
📚 Resource Manager
</h1>

<p className="text-slate-500 mt-2">
Manage PDFs, Notes, Worksheets, Videos and Question Banks
</p>

</div>

</div>

{/* Dashboard */}

<div className="grid md:grid-cols-4 gap-6 mb-8">

<div className="bg-white rounded-2xl shadow p-6 text-center">

<div className="text-5xl">📚</div>

<h2 className="text-3xl font-bold mt-2">
{totalResources}
</h2>

<p className="text-slate-500">
Resources
</p>

</div>

<div className="bg-white rounded-2xl shadow p-6 text-center">

<div className="text-5xl">📘</div>

<h2 className="text-3xl font-bold mt-2">
{totalPDF}
</h2>

<p className="text-slate-500">
PDFs
</p>

</div>

<div className="bg-white rounded-2xl shadow p-6 text-center">

<div className="text-5xl">📒</div>

<h2 className="text-3xl font-bold mt-2">
{totalNotes}
</h2>

<p className="text-slate-500">
Notes
</p>

</div>

<div className="bg-white rounded-2xl shadow p-6 text-center">

<div className="text-5xl">📝</div>

<h2 className="text-3xl font-bold mt-2">
{totalWorksheet}
</h2>

<p className="text-slate-500">
Worksheets
</p>

</div>

</div>

{/* Search */}

<div className="bg-white rounded-2xl shadow p-6 mb-8">

<input
  readOnly
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="🔍 Search Resource..."
className="w-full border rounded-xl p-4"
/>

</div>

{/* Add Resource */}

<div className="bg-white rounded-2xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">
Add New Resource
</h2>

<div className="grid md:grid-cols-2 gap-5">

<select
value={classId}
onChange={(e)=>setClassId(e.target.value)}
className="border rounded-lg p-3"
>

<option value="">
Select Class
</option>

{classes.map(c=>(

<option key={c.id} value={c.id}>

{c.class_name}

</option>

))}

</select>

<select
value={subjectId}
onChange={(e)=>setSubjectId(e.target.value)}
className="border rounded-lg p-3"
>

<option value="">
Select Subject
</option>

{subjects.map(s=>(

<option key={s.id} value={s.id}>

{s.subject_name}

</option>

))}

</select>

<select
value={bookId}
onChange={(e)=>setBookId(e.target.value)}
className="border rounded-lg p-3"
>

<option value="">
Select Book
</option>

{books.map(b=>(

<option key={b.id} value={b.id}>

{b.title}

</option>

))}

</select>

<select
value={chapterId}
onChange={(e)=>setChapterId(e.target.value)}
className="border rounded-lg p-3"
>

<option value="">
Select Chapter
</option>

{chapters.map(c=>(

<option key={c.id} value={c.id}>

Chapter {c.chapter_no} - {c.title}

</option>

))}

</select>

<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Resource Title"
className="border rounded-lg p-3"
/>

<select
value={resourceType}
onChange={(e)=>setResourceType(e.target.value)}
className="border rounded-lg p-3"
>

<option value="chapter_pdf">
Chapter PDF
</option>

<option value="worksheet">
Worksheet
</option>

<option value="notes">
Notes
</option>

<option value="ppt">
PPT
</option>

<option value="video">
Video
</option>

<option value="lesson_plan">
Lesson Plan
</option>

<option value="question_bank">
Question Bank
</option>

</select>

<div className="md:col-span-2">

<label className="font-semibold">
PDF File
</label>

<input
type="file"
accept=".pdf"
className="mt-2 block w-full border rounded-lg p-3"
onChange={async(e)=>{

const file=e.target.files?.[0];

if(!file) return;

const path=file.name;

const {error}=await supabase.storage
.from("library")
.upload(path,file,{
upsert:true
});

if(error){

alert(error.message);

return;

}

const {data}=supabase.storage
.from("library")
.getPublicUrl(path);

setFileUrl(data.publicUrl);

}}

 />

</div>
<div className="md:col-span-2 flex gap-4">

<button
onClick={saveResource}
disabled={loading}
className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
>

💾 Save Resource

</button>

<button
type="button"
onClick={()=>{
navigator.clipboard.writeText(fileUrl);
}}
className="bg-slate-700 text-white px-8 py-3 rounded-xl"
>

📋 Copy Path

</button>

{fileUrl.endsWith(".pdf") && (

<a
href={fileUrl}
target="_blank"
className="bg-green-600 text-white px-8 py-3 rounded-xl"
>

👀 Preview PDF

</a>

)}

</div>

</div>

</div>

{/* Existing Resources */}

<div className="mt-10">

<h2 className="text-3xl font-bold mb-6">

Existing Resources

</h2>
<div className="bg-white rounded-2xl shadow overflow-hidden">

  <div className="px-6 py-5 border-b">

    <h2 className="text-2xl font-bold">
      Existing Resources
    </h2>

  </div>

  {filteredResources.length === 0 ? (

    <div className="p-12 text-center">

      <div className="text-7xl">
        📂
      </div>

      <h2 className="text-2xl font-bold mt-4">
        No Resources Found
      </h2>

    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">
              Resource
            </th>

            <th className="p-4 text-left">
              Type
            </th>

            <th className="p-4 text-left">
              File
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredResources.map((r) => {

            let icon = "📄";

            switch (r.resource_type) {

              case "chapter_pdf":
                icon = "📘";
                break;

              case "worksheet":
                icon = "📝";
                break;

              case "notes":
                icon = "📒";
                break;

              case "ppt":
                icon = "📊";
                break;

              case "video":
                icon = "🎥";
                break;

              case "lesson_plan":
                icon = "📋";
                break;

              case "question_bank":
                icon = "❓";
                break;

            }

            return (

              <tr
                key={r.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">

                  <div className="flex items-center gap-4">

                    <div className="text-4xl">
                      {icon}
                    </div>

                    <div>

                      <div className="font-semibold">

                        {r.title}

                      </div>

                      <div className="text-sm text-slate-500">

                        ID : {r.id}

                      </div>

                    </div>

                  </div>

                </td>

                <td className="p-4">

                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">

                    {r.resource_type.replace("_"," ")}

                  </span>

                </td>

                <td className="p-4">

                  <div className="max-w-sm truncate">

                    {r.file_url}

                  </div>

                </td>

                <td className="p-4">

                  <div className="flex gap-2 justify-center">

                    <a
                      href={r.file_url}
                      target="_blank"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Preview
                    </a>

                    <a
                      href={r.file_url}
                      download
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Download
                    </a>

                    <button
                      onClick={() => deleteResource(r.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  )}

</div>

</div>

</div>

</div>
);
}