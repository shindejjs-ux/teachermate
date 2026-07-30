"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function ChaptersPage() {

  const [chapters,setChapters]=useState<any[]>([]);

  useEffect(()=>{
    load();
  },[]);

  async function load(){

    const {data}=await supabase
    .from("chapters")
    .select("*")
    .order("id");

    setChapters(data||[]);

  }

  return(

<div className="p-8">

<h1 className="text-3xl font-bold mb-8">
Chapters
</h1>

<table className="w-full border">

<thead>

<tr>

<th>ID</th>

<th>Title</th>

<th>Book</th>

</tr>

</thead>

<tbody>

{chapters.map((c:any)=>(

<tr key={c.id}>

<td>{c.id}</td>

<td>{c.title}</td>

<td>{c.book_id}</td>

</tr>

))}

</tbody>

</table>

</div>

  )

}