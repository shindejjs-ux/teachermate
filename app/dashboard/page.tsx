"use client";

import { useEffect, useState } from "react";
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
  Target,
  Trophy,
  FolderOpen,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/lib/supabase";



const cards=[
{
title:"Digital Library",
description:"NCERT books, PDFs, notes and teaching resources",
icon:Library,
href:"/library",
color:"bg-blue-600"
},

{
title:"AI Lesson Planner",
description:"Generate CBSE aligned lesson plans with LO & Skills",
icon:FileText,
href:"/lesson-planner",
color:"bg-green-600"
},

{
title:"Question Paper AI",
description:"Create CBSE pattern papers with blueprint",
icon:BookOpen,
href:"/question-paper",
color:"bg-purple-600"
},

{
title:"AI Teacher Assistant",
description:"Teaching ideas, strategies and classroom support",
icon:Brain,
href:"/ai-teacher",
color:"bg-pink-600"
},

{
title:"Student Portfolio",
description:"Track progress, IEP and learning evidence",
icon:FolderOpen,
href:"/students",
color:"bg-orange-600"
},

{
title:"Academic Analytics",
description:"Result analysis and performance insights",
icon:BarChart3,
href:"/analytics",
color:"bg-indigo-600"
},

{
title:"KRA KPI Tracker",
description:"Monitor academic goals and achievements",
icon:Target,
href:"/kpi",
color:"bg-red-600"
},

{
title:"Competency Learning",
description:"CBSE competency based resources",
icon:Trophy,
href:"/competency",
color:"bg-yellow-600"
}

];


export default function DashboardPage(){

const [stats,setStats] = useState([
{
title:"Lesson Plans",
value:"0",
icon:FileText
},
{
title:"Digital Resources",
value:"0",
icon:Library
},
{
title:"Students",
value:"0",
icon:Users
},
{
title:"Worksheets",
value:"0",
icon:ClipboardList
},
]);


useEffect(()=>{

async function loadStats(){

const {count:lessonCount}=await supabase
.from("lesson_plans")
.select("*",{count:"exact",head:true});


const {count:resourceCount}=await supabase
.from("resources")
.select("*",{count:"exact",head:true});


const {count:studentCount}=await supabase
.from("students")
.select("*",{count:"exact",head:true});


const {count:worksheetCount}=await supabase
.from("worksheets")
.select("*",{count:"exact",head:true});


setStats([

{
title:"Lesson Plans",
value:String(lessonCount ?? 0),
icon:FileText
},

{
title:"Digital Resources",
value:String(resourceCount ?? 0),
icon:Library
},

{
title:"Students",
value:String(studentCount ?? 0),
icon:Users
},

{
title:"Worksheets",
value:String(worksheetCount ?? 0),
icon:ClipboardList
}

]);


}


loadStats();

},[]);


return(

<div className="space-y-8">


{/* Hero */}

<div className="
rounded-3xl 
p-8 
text-white
bg-gradient-to-r
from-indigo-700
via-purple-700
to-pink-600
shadow-xl
">


<h1 className="text-4xl font-bold">
Welcome Dr. Jayesh Shinde 👋
</h1>


<p className="mt-3 text-lg text-indigo-100">
TeacherMate AI - CBSE Teaching Intelligence Platform
</p>


<div className="flex gap-3 items-center mt-5">

<Sparkles/>

<span>
Transforming classroom teaching with Artificial Intelligence
</span>

</div>


</div>



{/* Stats */}

<div className="
grid 
grid-cols-2
md:grid-cols-4
gap-5
">


{
stats.map((item)=>{

const Icon=item.icon;


return(

<div
key={item.title}
className="
bg-white
rounded-2xl
shadow-md
p-5
hover:shadow-xl
transition
"
>


<Icon
className="text-indigo-600"
size={28}
/>


<h2 className="text-3xl font-bold mt-3">

{item.value}

</h2>


<p className="text-gray-500">

{item.title}

</p>


</div>


)

})

}


</div>





{/* Features */}


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">


{
cards.map((card)=>{

const Icon=card.icon;


return(

<Link
href={card.href}
key={card.title}
className="
bg-white
rounded-3xl
p-6
shadow-md
hover:shadow-2xl
transition
border
hover:-translate-y-1
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



<h2 className="
text-xl
font-bold
mt-5
text-slate-800
">

{card.title}

</h2>


<p className="
text-gray-500
mt-2
">

{card.description}

</p>


<div className="
mt-5
text-indigo-600
font-semibold
">

Open →

</div>


</Link>


)

})

}


</div>






{/* Today's Teaching */}

<div className="
grid
md:grid-cols-2
gap-6
">


<div className="
bg-white
rounded-3xl
shadow
p-6
">


<h2 className="
text-2xl
font-bold
flex
items-center
gap-2
">

<GraduationCap/>

Today's Teaching

</h2>


<ul className="mt-5 space-y-3">


<li>
📘 Class 9 Mathematics - Chapter 3
</li>

<li>
🎯 Learning Outcome Mapping Completed
</li>

<li>
📝 Worksheet Pending Review
</li>


</ul>


</div>




<div className="
bg-gradient-to-r
from-indigo-500
to-purple-600
text-white
rounded-3xl
p-6
">


<h2 className="
text-2xl
font-bold
">

🤖 AI Assistant Status

</h2>


<p className="mt-4">

TeacherMate AI is ready to help you create:

</p>


<ul className="mt-3 space-y-2">

<li>✓ Lesson Plans</li>

<li>✓ Question Papers</li>

<li>✓ Worksheets</li>

<li>✓ Student Analysis</li>

</ul>


</div>



</div>




{/* Activity */}

<div className="
bg-white
rounded-3xl
shadow
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Activity

</h2>


<ul className="space-y-4">


<li>
📄 Lesson Plan Generated
<span className="text-gray-400 ml-2">
Today
</span>
</li>


<li>
📚 Class 9 Maths Library Updated
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
🤖 AI Assistant Used
<span className="text-gray-400 ml-2">
3 days ago
</span>
</li>


</ul>


</div>



</div>

)

}