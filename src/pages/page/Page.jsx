import React, { useState, useEffect } from 'react'
import { supabase } from "../../supabase-client";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { div } from 'framer-motion/client';

export default function Page() {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState([]);
  const [chapter, setChapter] = useState("");
  const [lastfirst, setLastFirst] = useState({ last: 0, first: 0 });
  const { pageId } = useParams();
  const [isLoading, setIsLoading] = useState(false);


  const getUnits = async () => {
    setIsLoading(true)




    const data1 = await supabase
      .from("Pagina")
      .select("*")
      .eq("id", pageId);

    setChapter(data1.data[0])
    console.log(data1)


    const data0 = await supabase
      .from("Pagina")
      .select("*")
      .eq("cap_id", data1.data[0].cap_id);

    setLastFirst(({ last: data0.data[data0.data.length - 1].id, first: data0.data[0].id }))


    const data = await supabase
      .from("Ejercicio")
      .select("*")
      .eq("page_id", pageId);
    setExercises(data.data)

    setIsLoading(false)
  }

  const HandleNext = async () => {
    let next = chapter.id + 1

    console.log(next)
    if (next <= lastfirst.last) {
      navigate(`/page/${next}`)
      //navigate(0)
    }
    return
  }

  const HandlePrev = async () => {
    let next = chapter.id - 1

    console.log(next)
    if (next >= lastfirst.first) {
      navigate(`/page/${next}`)
      //navigate(0)
    }
    return
  }


  useEffect(() => {
    getUnits()
  }, [pageId]);

  return (
    <div className="bg-surface  p-3 flex flex-col items-center">

      <div className="p-5 mb-5 text-4xl text-text-body font-bold w-full">
        {isLoading ? "Cargando..." : <div>
          <div>
            {chapter.title}
          </div>
          <p className="!text-gray-500 !text-lg">
            {chapter.subtitle}
          </p>
        </div>}
      </div>

      {isLoading ? "Cargando..." :
        <div className="flex justify-between w-full p-5">
          <button
            onClick={HandlePrev}
            className="cursor-pointer bg-brand-primary w-25 px-3 py-1 text-surface font-bold">
            Anterior
          </button>

          <button
            onClick={HandleNext}
            className="cursor-pointer bg-brand-primary w-25 px-3 py-1 text-surface font-bold">
            Siguiente
          </button>
        </div>}

      <div className='w-full flex flex-wrap gap-2 justify-center'>
        {isLoading ?
          <div className="text-accent">
            Cargando...
          </div> : exercises.map((exercise) => {
            return (
              <div
                className='cursor-pointer w-full max-w-60 p-2 border border-brand-primary rounded-lg bg-surface mb-5'
                key={exercise.id}
                onClick={() => navigate(`/chapter/${exercise.id}`)}
              >
                <img src={exercise.image_url} alt="" className="w-full h-auto rounded-lg shadow-md mx-auto block" />
                <h3 className="text-brand-primary font-bold">
                  {exercise.title}
                </h3>
                <h4 className='text-text-body'>
                  {exercise.subtitle}
                </h4>
              </div>
            )
          })}
      </div>
      {isLoading ? "Cargando..." :
        <div className="flex justify-between w-full p-5">
          <button 
          onClick={HandlePrev}
          className="cursor-pointer bg-brand-primary w-25 px-3 py-1 text-surface font-bold">
            Anterior
          </button>

          <button 
          onClick={HandleNext}
          className="cursor-pointer bg-brand-primary w-25 px-3 py-1 text-surface font-bold">
            Siguiente
          </button>
        </div>}

    </div>
  )
}
