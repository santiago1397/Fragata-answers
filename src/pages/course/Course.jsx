import React, { useEffect, useState } from 'react'
import { supabase } from "../../supabase-client";
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';

export default function Course() {

  const navigate = useNavigate()
  const [units, setUnits] = useState([]);
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(false);


  const getUnits = async () => {
    setIsLoading(true)

    const data = await supabase
      .from("Capitulo")
      .select("*")
      .eq("course_id", courseId);
    setUnits(data.data)

    setIsLoading(false)
  }

  useEffect(() => {
    getUnits()
  }, []);

  return (
    <div className="bg-surface  p-3 flex flex-col items-center">

      <div className="p-5 mb-5 text-4xl text-brand-accent font-bold bg-brand-primary w-full">
        Unidades
      </div>

      <div className='w-full flex flex-wrap gap-2 justify-center'>
        {isLoading ?
          <div className="text-accent">
            Cargando...
          </div> : units.map((unit) => {
            return (
              <div
                className='cursor-pointer w-full max-w-60 p-2 border border-brand-primary rounded-lg bg-surface mb-5'
                key={unit.id}
                onClick={() => navigate(`/chapter/${unit.id}`)}
              >
                <img src={unit.image_url} alt="" className="w-full h-auto rounded-lg shadow-md mx-auto block" />
                <h3 className="text-brand-primary font-bold">
                  {unit.title}
                </h3>
                <h4 className='text-text-body'>
                  {unit.subtitle}
                </h4>
              </div>
            )
          })}
      </div>

    </div>
  )
}
