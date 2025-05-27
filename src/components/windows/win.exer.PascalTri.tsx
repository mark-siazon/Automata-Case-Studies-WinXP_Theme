import React, { useEffect, useRef, useState } from "react";
import Window from "../home/Window";
import { Hexagon } from "./pascal/pascal.Hexagon";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { gsap } from "gsap";
import { generatePascal } from "./pascal/pascal.Logic";
import styles from "../../styles/exer.pascal.module.css";

export interface PascalWindowProps {
  id: string;
}

const PascalWindow: React.FC<PascalWindowProps> = ({ id }) => {
  const hexagonRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const chevronLeftRef = useRef<SVGSVGElement | null>(null);
  const chevronRightRef = useRef<SVGSVGElement | null>(null);
  const hexagonFloat = useRef<gsap.core.Timeline | null>(null);

  const [pascalTriangleData, setPascalTriangleData] = useState<number[][]>([]);
  const [pascalHeight, setPascalHeight] = useState(0);

  // Animate out on data change
  useEffect(() => {
    if (!pascalTriangleData.length) return;

    gsap.to(hexagonRef.current, { y: 0, duration: 1, ease: "expo.in" });
    gsap.to(titleRef.current, {
      opacity: 0,
      duration: 1,
      y: -100,
      ease: "expo.in",
      onComplete: () => {
        if (titleRef.current) {
          titleRef.current.style.display = "none";
        }
        return;
      },
    });
    gsap.to(chevronLeftRef.current, {
      opacity: 0,
      duration: 1,
      x: 50,
      ease: "expo.in",
      onComplete: () => {
        if (chevronLeftRef.current) {
          chevronLeftRef.current.style.display = "none";
        }
        return;
      },
    });
    gsap.to(chevronRightRef.current, {
      opacity: 0,
      duration: 1,
      x: -50,
      ease: "expo.in",
      onComplete: () => {
        if (chevronRightRef.current) {
          chevronRightRef.current.style.display = "none";
        }
        return;
      },
    });
    hexagonFloat.current?.kill();
  }, [pascalTriangleData]);

  // Floating animation
  useEffect(() => {
    if (!hexagonRef.current) return;

    hexagonFloat.current = gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(hexagonRef.current, { y: -30, duration: 2, ease: "power1.inOut" })
      .to(hexagonRef.current, { y: 30, duration: 2, ease: "power1.inOut" });

    return () => {
      hexagonFloat.current?.kill();
    };
  }, []);

  // Bump effect
  const bump = () => {
    gsap.to(hexagonRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(hexagonRef.current, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        return;
      },
    });
  };

  const incrementPascalHeight = () => {
    if (pascalHeight >= 15) return;
    setPascalHeight((h) => h + 1);
    bump();
  };

  const decrementPascalHeight = () => {
    if (pascalHeight <= 0) return;
    setPascalHeight((h) => h - 1);
    bump();
  };

  const startPascalGeneration = () => {
    if (!hexagonRef.current) return;
    gsap.to(hexagonRef.current, {
      scale: 1.3,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        setPascalTriangleData(generatePascal(pascalHeight));
        setPascalHeight(0);
      },
    });
  };

  const restartAll = () => {
    if (titleRef.current) {
      titleRef.current.style.display = "block";
      titleRef.current.style.opacity = "1";
      titleRef.current.style.transform = "translateY(0)";
    }
    [chevronLeftRef, chevronRightRef].forEach((ref) => {
      if (ref.current) {
        ref.current.style.display = "block";
        ref.current.style.opacity = "1";
        ref.current.style.transform = "translateX(0)";
      }
    });
    if (hexagonRef.current) {
      gsap.killTweensOf(hexagonRef.current);
      gsap.set(hexagonRef.current, { scale: 1, opacity: 1, y: 0 });
    }
    setPascalTriangleData([]);
    setPascalHeight(0);
    hexagonFloat.current?.restart();
  };

  return (
    <Window
      id={id}
      title="Pascal Triangle Generator"
      taskbarLabel="Pascal"
      canMinimize
      canMaximize
      canClose
    >
      <div
        className={`flex flex-col items-center justify-center w-full h-full overflow-hidden ${styles.pascalContainer}`}
      >
        <h2 ref={titleRef} className={styles.title}>
          Click hexagon to start
        </h2>

        {pascalTriangleData.length === 0 ? (
          <div className="h-20 w-full flex items-center justify-center">
            <ChevronLeft
              ref={chevronLeftRef}
              onClick={decrementPascalHeight}
              className="mr-10"
            />
            <Hexagon
              ref={hexagonRef}
              onClick={startPascalGeneration}
              className="h-full w-20 hover:scale-110 ease-in-out duration-300 cursor-pointer"
            >
              <span className="text-white text-2xl select-none">
                {pascalHeight}
              </span>
            </Hexagon>
            <ChevronRight
              ref={chevronRightRef}
              onClick={incrementPascalHeight}
              className="ml-10"
            />
          </div>
        ) : (
          pascalTriangleData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="h-20 w-full flex items-center justify-center"
            >
              {row.map((value, index) => (
                <Hexagon
                  key={index}
                  animateOnEnter
                  animationDelay={(index + rowIndex) * 0.3}
                  className="h-full w-20"
                >
                  <span className="text-white text-xl select-none">
                    {value}
                  </span>
                </Hexagon>
              ))}
            </div>
          ))
        )}

        {pascalTriangleData.length > 0 && (
          <button onClick={restartAll} className="mt-4 p-2 text-white rounded">
            <RotateCcw className="w-6 h-6" />
          </button>
        )}

        <div className={styles.footerCard}>BY: BALUYUT, SIAZON, VILLAROSA</div>
      </div>
    </Window>
  );
};

export default PascalWindow;
