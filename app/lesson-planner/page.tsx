"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Item = {
  id: number;
  name?: string;
  title?: string;
};

type LessonPlan = {
  id: number;
  title: string;
  chapter: string;
  teacher_name: string;
  duration: string;
  created_at: string;
};


export default function LessonPlannerPage() {

  const [classes, setClasses] = useState<Item[]>([]);
  const [subjects, setSubjects] = useState<Item[]>([]);
  const [books, setBooks] = useState<Item[]>([]);
  const [chapters, setChapters] = useState<Item[]>([]);

  const [savedPlans, setSavedPlans] = useState<LessonPlan[]>([]);

  const [userId, setUserId] = useState("");
  const [teacherName, setTeacherName] = useState("Teacher");


  const [form,setForm] = useState({

    classId:"",
    subjectId:"",
    bookId:"",
    chapterId:"",

    className:"",
    subject:"",
    book:"",
    chapter:"",

    duration:"40",
    teachingMethod:"Experiential",

  });


  const [lesson,setLesson] = useState("");

  const [loading,setLoading] = useState(false);



  useEffect(()=>{

    initialize();

  },[]);



  async function initialize(){

    await getUser();

    loadClasses();

    loadLessonPlans();

  }



  async function getUser(){

    const {
      data
    } = await supabase.auth.getUser();


    if(data.user){

      setUserId(data.user.id);


      const {
        data:profile
      } = await supabase

      .from("teachers")

      .select("teacher_name")

      .eq("email",data.user.email)

      .single();



      if(profile?.teacher_name){

        setTeacherName(profile.teacher_name);

      }

    }

  }



  useEffect(()=>{

    if(form.classId){

      loadSubjects(form.classId);

    }

  },[form.classId]);



  useEffect(()=>{

    if(form.subjectId){

      loadBooks(form.subjectId);

    }

  },[form.subjectId]);



  useEffect(()=>{

    if(form.bookId){

      loadChapters(form.bookId);

    }

  },[form.bookId]);



  async function loadClasses(){

    const {data}=await supabase

    .from("classes")

    .select("id,name")

    .order("id");


    setClasses(data || []);

  }



  async function loadSubjects(classId:string){

    const {data}=await supabase

    .from("subjects")

    .select("id,name")

    .eq("class_id",classId)

    .order("id");


    setSubjects(data || []);

  }



  async function loadBooks(subjectId:string){

    const {data}=await supabase

    .from("books")

    .select("id,title")

    .eq("subject_id",subjectId)

    .order("id");


    setBooks(data || []);

  }



  async function loadChapters(bookId:string){

    const {data}=await supabase

    .from("chapters")

    .select("id,title")

    .eq("book_id",bookId)

    .order("chapter_no");


    setChapters(data || []);

  }



  function handleChange(
    e:React.ChangeEvent<HTMLSelectElement>
  ){

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  }



  function generateLesson(){


    setLesson(`

LESSON PLAN


Class:
${form.className}


Subject:
${form.subject}


Book:
${form.book}


Chapter:
${form.chapter}



Learning Objectives:

• Understand concepts clearly
• Develop problem solving ability
• Apply mathematics in real life



Learning Outcomes:

Students will be able to explain concepts and solve related problems.



Prerequisite Knowledge:

Basic concepts related to the chapter.



Teaching Methodology:

${form.teachingMethod}



Activities:

• Concept demonstration
• Group discussion
• Practice worksheet



Assessment:

• Oral questions
• Class activity
• Worksheet evaluation



Skills:

• Critical thinking
• Problem solving



Values:

• Logical reasoning
• Confidence



Duration:

${form.duration} minutes


`);

  }
    async function saveLessonPlan(){

    if(!form.chapterId || !lesson){

      alert("Please generate lesson plan first");
      return;

    }


    const {error}=await supabase

    .from("lesson_plans")

    .insert({

      class_id:Number(form.classId),

      subject_id:Number(form.subjectId),

      book_id:Number(form.bookId),

      chapter_id:Number(form.chapterId),


      title:`${form.subject} - ${form.chapter}`,

      chapter:form.chapter,

      book:form.book,


      learning_objectives:
      "Understand concepts, solve problems and apply learning.",


      learning_outcomes:
      "Students will be able to explain concepts and solve problems.",


      prerequisite_knowledge:
      "Basic prerequisite concepts.",


      teaching_methodology:
      form.teachingMethod,


      teaching_method:
      form.teachingMethod,


      activities:
      "Concept demonstration, discussion and practice activities.",


      assessment:
      "Oral questions, worksheet and class assessment.",


      skills:
      "Critical thinking, logical reasoning and problem solving.",


      values:
      "Confidence, accuracy and analytical thinking.",


      ai_generated:true,


      created_by:
      userId || null,


      teacher_name:
      teacherName,


      duration:
      form.duration,


      content:
      lesson,


      language:
      "English"

    });



    if(error){

      alert(error.message);

      return;

    }


    alert("Lesson Plan Saved Successfully");


    loadLessonPlans();

  }





  async function loadLessonPlans(){

    const {data}=await supabase

    .from("lesson_plans")

    .select(`
      id,
      title,
      chapter,
      teacher_name,
      duration,
      created_at
    `)

    .order("id",{ascending:false});



    setSavedPlans(data || []);

  }





  async function deleteLessonPlan(id:number){

    const ok=confirm(
      "Delete this lesson plan?"
    );


    if(!ok)
      return;



    const {error}=await supabase

    .from("lesson_plans")

    .delete()

    .eq("id",id);



    if(error){

      alert(error.message);

      return;

    }



    loadLessonPlans();

  }





  return (

<div className="min-h-screen bg-gray-100">


<div className="bg-teal-700 text-white p-8">

<h1 className="text-4xl font-bold">
📝 AI Lesson Planner
</h1>

<p className="mt-2">
Generate and save CBSE lesson plans.
</p>

</div>




<div className="max-w-5xl mx-auto p-8">


<div className="bg-white rounded-2xl shadow p-8">


<div className="grid md:grid-cols-2 gap-6">



<div>

<label className="font-semibold">
Class
</label>


<select

value={form.classId}

onChange={(e)=>{

const c=classes.find(
x=>x.id===Number(e.target.value)
);


setForm({

...form,

classId:e.target.value,

className:c?.name || "",

subjectId:"",
bookId:"",
chapterId:""

});


}}

className="w-full border p-3 rounded-lg mt-2"

>

<option value="">
Select Class
</option>


{classes.map(c=>(

<option key={c.id} value={c.id}>
{c.name}
</option>

))}


</select>


</div>




<div>

<label className="font-semibold">
Subject
</label>


<select

value={form.subjectId}

onChange={(e)=>{

const s=subjects.find(
x=>x.id===Number(e.target.value)
);


setForm({

...form,

subjectId:e.target.value,

subject:s?.name || "",

bookId:"",
chapterId:""

});


}}

className="w-full border p-3 rounded-lg mt-2"

>


<option value="">
Select Subject
</option>


{subjects.map(s=>(

<option key={s.id} value={s.id}>
{s.name}
</option>

))}


</select>


</div>





<div>

<label className="font-semibold">
Book
</label>


<select

value={form.bookId}

onChange={(e)=>{

const b=books.find(
x=>x.id===Number(e.target.value)
);


setForm({

...form,

bookId:e.target.value,

book:b?.title || "",

chapterId:""

});


}}

className="w-full border p-3 rounded-lg mt-2"

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


</div>





<div>

<label className="font-semibold">
Chapter
</label>


<select

value={form.chapterId}

onChange={(e)=>{

const c=chapters.find(
x=>x.id===Number(e.target.value)
);


setForm({

...form,

chapterId:e.target.value,

chapter:c?.title || ""

});


}}

className="w-full border p-3 rounded-lg mt-2"

>


<option value="">
Select Chapter
</option>


{chapters.map(c=>(

<option key={c.id} value={c.id}>
{c.title}
</option>

))}


</select>


</div>





<div>

<label className="font-semibold">
Duration
</label>


<select

name="duration"

value={form.duration}

onChange={handleChange}

className="w-full border p-3 rounded-lg mt-2"

>

<option>
35
</option>

<option>
40
</option>

<option>
45
</option>

<option>
60
</option>


</select>

</div>





<div>

<label className="font-semibold">
Teaching Method
</label>


<select

name="teachingMethod"

value={form.teachingMethod}

onChange={handleChange}

className="w-full border p-3 rounded-lg mt-2"

>

<option>
Experiential
</option>

<option>
Activity Based
</option>

<option>
Discussion
</option>

<option>
Problem Solving
</option>

<option>
Inquiry Based
</option>


</select>


</div>


</div>




<button

onClick={generateLesson}

className="mt-8 w-full bg-teal-600 text-white p-4 rounded-xl text-xl font-bold"

>

🤖 Generate Lesson Plan

</button>



</div>





{lesson && (

<div className="bg-white shadow rounded-2xl p-8 mt-8">


<h2 className="text-2xl font-bold">
Generated Lesson Plan
</h2>


<pre className="whitespace-pre-wrap mt-4">
{lesson}
</pre>



<button

onClick={saveLessonPlan}

className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"

>

💾 Save Lesson Plan

</button>


</div>

)}






<div className="bg-white shadow rounded-2xl p-8 mt-8">


<h2 className="text-2xl font-bold mb-5">
Saved Lesson Plans
</h2>


{savedPlans.map(plan=>(

<div

key={plan.id}

className="border rounded-lg p-4 mb-4"

>


<h3 className="font-bold">
{plan.title}
</h3>


<p>
Chapter: {plan.chapter}
</p>


<p>
Teacher: {plan.teacher_name}
</p>


<p>
Duration: {plan.duration} minutes
</p>


<button

onClick={()=>deleteLessonPlan(plan.id)}

className="mt-3 bg-red-600 text-white px-4 py-2 rounded"

>

Delete

</button>


</div>

))}


</div>



</div>


</div>


);


}