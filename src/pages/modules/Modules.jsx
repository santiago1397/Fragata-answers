import React, { useEffect, useState } from 'react'
import { supabase } from "../../supabase-client";
import { useNavigate } from 'react-router-dom';

export default function Modules() {

  const navigate = useNavigate()
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const getCourses = async () => {
    setIsLoading(true)

    const data = await supabase
      .from("Curso")
      .select("*")

    setCourses(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    getCourses()
  }, []);


  return (
    <div className="bg-surface  p-3 flex flex-col items-center">

      <div className="p-5 mb-5 text-4xl text-brand-accent font-bold bg-brand-primary w-full">
        Cursos
      </div>

      <div className='w-full flex flex-wrap gap-2 justify-center'>
        {isLoading? 
        <div className="text-accent">
          Cargando...
        </div> : courses.map((course) => {
          return (
            <div
              className='cursor-pointer w-full max-w-60 p-2 border border-brand-primary rounded-lg bg-surface mb-5'
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <img src={course.image_url} alt="" className="w-full h-auto rounded-lg shadow-md mx-auto block" />
              <h3 className="text-brand-primary font-bold">
                {course.title}
              </h3>
              <h4 className='text-text-body'>
                {course.subtitle}
              </h4>
            </div>
          )
        })}
      </div>

    </div>
  )

}
