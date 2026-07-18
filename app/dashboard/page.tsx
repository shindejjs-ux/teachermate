"use client";

import Link from "next/link";
import {
  Library,
  FileText,
  BookOpen,
  Brain,
  Users,
  BarChart3,
  Sparkles,
  ClipboardList,
  GraduationCap,
} from "lucide-react";


const stats = [
  {
    title: "Lesson Plans",
    value: "24",
    icon: FileText,
  },
  {
    title: "Resources",
    value: "120+",
    icon: Library,
  },
  {
    title: "Students",
    value: "46",
    icon: Users,
  },
  {
    title: "Worksheets",
    value: "35",
    icon: ClipboardList,
  },
];


const cards = [
  {
    title: "Digital Library",
    description:
      "Access NCERT books, notes, worksheets and PDFs",
    icon: Library,
    href: "/library",
    color: "bg-blue-500",
  },

  {
    title: "Lesson Planner AI",
    description:
      "Generate CBSE lesson plans with learning outcomes",
    icon: FileText,
    href: "/lesson-planner",
    color: "bg-green-500",
  },

  {
    title: "Question Paper Generator",
    description:
      "Create CBSE pattern question papers",
    icon: BookOpen,
    href: "/question-paper",
    color: "bg-purple-500",
  },

  {
    title: "AI Teacher Assistant",
    description:
      "Ask AI about teaching strategies",
    icon: Brain,
    href: "/ai-teacher",
    color: "bg-pink-500",
  },


  {
    title: "Student Management",
    description:
      "Track performance and learning progress",
    icon: Users,
    href: "/students",
    color: "bg-orange-500",
  },


  {
    title: "Analytics Dashboard",
    description:
      "View academic reports and insights",
    icon: BarChart3,
    href: "/analytics",
    color: "bg-indigo-500",
  },

];


export default function DashboardPage() {

return (

<div className="space-y-8">


{/* Header */}

<div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">

<h1 className="text-4xl font-bold">
Welcome, Dr. Jayesh Shinde 👋
</h1>

<p className="mt-3 text-indigo-100 text-lg">
AI Powered CBSE Teaching Platform
</p>


<div className="flex items-center gap-2 mt-5">

<Sparkles size={22}/>

<span>
Transforming Teaching with Artificial Intelligence
</span>

</div>

</div>



{/* Statistics */}


<div className="grid grid-cols-2 md:grid-cols-4 gap-5">

{
stats.map((item)=>{

const Icon=item.icon;

return (

<div
key={item.title}
className="bg-white rounded-2xl shadow p-5"
>

<Icon className="text-indigo-600"/>

<h3 className="text-3xl font-bold mt-3">
{item.value}
</h3>

<p className="text-gray-500">
{item.title}
</p>

</div>

)

})

}

</div>





{/* Main Features */}


<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


{
cards.map((card)=>{

const Icon=card.icon;


return (

<Link
key={card.title}
href={card.href}
className="
bg-white 
rounded-2xl 
shadow 
hover:shadow-xl 
transition 
p-6
"
>


<div
className={`
${card.color}
w-14 
h-14 
rounded-xl 
flex 
items-center 
justify-center 
text-white
`}
>

<Icon size={28}/>

</div>



<h2 className="text-2xl font-bold mt-5 text-slate-800">

{card.title}

</h2>


<p className="text-gray-500 mt-2">

{card.description}

</p>


<div className="mt-6 text-indigo-600 font-semibold">

Open →

</div>


</Link>


)

})

}


</div>





{/* Recent Activity */}


<div className="
bg-white 
rounded-2xl 
shadow 
p-6
">


<div className="flex items-center gap-3 mb-5">

<GraduationCap/>

<h2 className="text-2xl font-bold">

Recent Activity

</h2>

</div>



<ul className="space-y-4">


<li>
📄 Lesson Plan Generated
<span className="text-gray-400 ml-2">
Today
</span>
</li>


<li>
📚 Class 9 Mathematics PDF Added
<span className="text-gray-400 ml-2">
Yesterday
</span>
</li>


<li>
📝 Worksheet Created
<span className="text-gray-400 ml-2">
2 days ago
</span>
</li>


<li>
🤖 AI Teaching Assistant Used
<span className="text-gray-400 ml-2">
3 days ago
</span>
</li>


</ul>


</div>


</div>

)

}