import React, { useEffect, useState } from 'react'
import { supabase } from "../../supabase-client";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Chapter() {
  const navigate = useNavigate()
  const [pages, setPages] = useState([]);
  const { chapterId } = useParams();
  const [isLoading, setIsLoading] = useState(false);


  const getUnits = async () => {
    setIsLoading(true)

    const data = await supabase
      .from("Pagina")
      .select("*")
      .eq("cap_id", chapterId);
    setPages(data.data)

    setIsLoading(false)
  }

  useEffect(() => {
    getUnits()
  }, []);

  return (
    <div className="bg-surface  p-3 flex flex-col items-center">

      <div className="p-5 mb-5 text-4xl text-brand-accent font-bold bg-brand-primary w-full">
        Capítulo 
      </div>

      <div className='w-full flex flex-wrap gap-2 justify-center'>
        {isLoading ?
          <div className="text-accent">
            Cargando...
          </div> : pages.map((page) => {
            return (
              <div
                className='cursor-pointer w-full max-w-60 p-2 border border-brand-primary rounded-lg bg-surface mb-5'
                key={page.id}
                onClick={() => navigate(`/page/${page.id}`)}
              >
                <h3 className="text-brand-primary font-bold">
                  {page.title}
                </h3>
                <h4 className='text-text-body'>
                  {page.subtitle}
                </h4>
              </div>
            )
          })}
      </div>

    </div>
  )
}
