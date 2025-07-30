import React, { useState, useEffect, useRef, use } from 'react'
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { stagger } from 'framer-motion';


gsap.registerPlugin(ScrollTrigger, SplitText);


/* 
  Split Text Animation

  refence: https://www.youtube.com/watch?v=4A0dP8yMwD8
  dependencies: npm i @gsap/react gsap
  how to use: you need to pass a div, h1, p, etc: to make it work

*/

export default function TextSplitanimation({ children, animateOnScroll = true, delay = 0 }) {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    splitRef.current = [];
    elementRef.current = []
    lines.current = [];

    let elements = [];
    if (containerRef.current.hasAttribute("data-copy-wrapper")) {
      elements = Array.from(containerRef.current.children);
    } else {
      elements = [containerRef.current];
    }

    elements.forEach((element) => {
      elementRef.current.push(element);

      const split = SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "line++"
      });

      splitRef.current.push(split);

      const computedStyle = window.getComputedStyle(element);
      const textIdent = computedStyle.textIndent;

      if (textIdent && textIdent === "0px") {
        if (split.lines.length > 0) {
          split.lines[0].style.paddingLeft = textIdent;
        }
        element.style.textIdent = "0";
      }

      lines.current.push(...split.lines);
    })

    gsap.set(lines.current, { y: "100%" });

    const animationProps = {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: delay,
    }

    if (animateOnScroll) {
      gsap.to(lines.current, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        }
      })
    } else {
      gsap.to(lines.current, animationProps);
    }

    return () => {
      splitRef.current.forEach((split) => {
        if (split) {
          split.revert();
        }
      });
    }

  }, {
    scope: containerRef,
    dependencies: [animateOnScroll, delay]
  });

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, { ref: containerRef });
  }


  return (
    <div ref={containerRef} data-copy-wrapper='true'>
      {children}
    </div>
  );
}
