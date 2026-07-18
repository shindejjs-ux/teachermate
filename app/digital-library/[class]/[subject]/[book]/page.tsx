"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BookPage() {

  const params = useParams();
  const bookId = params.book;

  const [chapters,setChapters]=useState<any[]>([]);

  useEffect(()=>{

    loadChapters();

  },[]);

  async function loadChapters(){

    const {data,error}=await supabase
      .from("chapters")
      .select("*")
      .eq("book_id",Number(bookId))
      .order("id");

    if(error){
      console.error(error);
      return;
    }

    setChapters(data || []);

  }

  return(

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Chapters
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {chapters.map((chapter)=>(

          <Link
            key={chapter.id}
            href={`/digital-library/${params.class}/${params.subject}/${bookId}/${chapter.id}`}
          >

            <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

              <h2 className="font-bold text-xl">

                {chapter.title}

              </h2>

            </div>

          </Link>

        ))}

      </div>

    </div>

  );

}