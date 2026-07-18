"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type ClassItem = {
  id: number;
  name: string;
};

export default function DigitalLibrary() {

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {

    const { data, error } = await supabase
      .from("classes")
      .select("id,name")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setClasses(data || []);
    setLoading(false);
  }


  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading Digital Library...
      </div>
    );
  }


  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        📚 Digital Library
      </h1>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


        {classes.map((cls)=>(

          <Link
            key={cls.id}
            href={`/digital-library/${cls.id}`}
          >

            <div
              className="
              bg-white 
              rounded-2xl 
              shadow-lg 
              p-8 
              hover:shadow-xl 
              hover:scale-105 
              transition 
              cursor-pointer
              "
            >

              <div className="text-5xl mb-4">
                📚
              </div>


              <h2 className="text-2xl font-bold">
                {cls.name}
              </h2>


            </div>

          </Link>

        ))}


      </div>

    </div>
  );
}