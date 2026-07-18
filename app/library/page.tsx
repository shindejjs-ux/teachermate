"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LibraryPage() {

  const [classes,setClasses]=useState<any[]>([]);


  useEffect(()=>{

    loadClasses();

  },[]);



  async function loadClasses(){

    const {data,error}=await supabase
    .from("classes")
    .select("*")
    .order("id");


    if(error){
      console.error(error);
      return;
    }


    setClasses(data || []);

  }



return(

<div className="p-8">


<h1 className="text-4xl font-bold text-indigo-700 mb-8">
📚 Digital Library
</h1>



<div className="grid md:grid-cols-3 gap-6">


{classes.map((item)=>(


<Link

key={item.id}

href={`/digital-library/${item.id}`}

>


<div className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 transition">


<h2 className="text-2xl font-bold">

Class {item.name}

</h2>


<p className="text-gray-500 mt-2">

Explore Books & Resources

</p>


</div>


</Link>


))}


</div>


</div>


)

}