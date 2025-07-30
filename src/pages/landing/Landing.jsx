import React from 'react'
import TextAnimation from '../../components/Textanimation'
import TextSplitanimation from '../../components/TextSplitanimation'
import ReactLenis from 'lenis/react'

export default function Landing() {



  return (
    <ReactLenis>
      <div className="bg-surface  p-3 flex flex-col items-center">
        <TextSplitanimation delay={0.5}>
          <h1 className="leading-snug pt-5 text-4xl text-brand-primary font-bold">
            Domina Fragata de la UNC: Todas las Respuestas en un Solo Lugar.
          </h1>
        </TextSplitanimation>

        <div className="border border-brand-primary rounded-4xl w-full flex flex-col items-center mt-5 p-5">
          {/* <h3 className=" bg-gradient-to-r to-brand-primary from-brand-accent 
          bg-clip-text text-transparent p-5 pt-5 text-4xl text-brand-primary font-bold">
            COTAS
            
          </h3> */}
          <h3 >
            <TextAnimation words={["COTAS", "MÁXIMOS", "CURVAS", "MÍNIMOS", "DOMINIO", "RANGO"]} />
          </h3>
        </div>

        <p className='text-md mt-11 text-text-body'>
          No dejes que una pregunta de Fragata UNC te detenga. Si estás repasando, te has quedado en blanco o simplemente quieres explorar nuevas formas de resolver un problema, nuestra plataforma te ofrece
          <span className='text-brand-primary font-bold'> las respuestas y explicaciones que necesitas </span>
          para avanzar, entender a fondo y estudiar de forma más eficiente.
        </p>


        <button className="cursor-pointer  mt-8 w-full text-2xl
        bg-brand-primary text-brand-accent font-bold py-2 px-4 
        rounded hover:rounded-3xl transition-all !transition-all duration-300">
          <a href="/courses">
            INICIAR
          </a>
        </button>
      </div>
    </ReactLenis>
  )
}
