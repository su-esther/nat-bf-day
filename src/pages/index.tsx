import {
  AnimatePresence,
  motion,
  MotionValue,
  useAnimation,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const router = useRouter();
  const carouselAnimation = useAnimation();
  const [showMessage, setShowMessage] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [hearts, setHearts] = useState<Emoji[]>([]);
  const [showMusic, setShowMusic] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const phrases = [
    "",
    "r laugh *haehaehaehae*",
    "r cheezy grin when you see me",
    "r unrivaled thoughtfulness",
    "r prayerfulness",
  ];
  var [idx, setIdx] = useState(0);

  interface Emoji {
    x: number;
    y: number;
  }

  const handleClick = () => {
    setShowMessage(true);
    if (idx == phrases.length) {
      router.push("/ending"); // Navigate to the new page
    }

    if (idx < phrases.length) {
      setButtonText(phrases[idx]);
      if (phrases[idx] === "r music taste") {
        setShowMusic(true);
      } else {
        setShowMusic(false);
      }
      if (phrases[idx] === "") {
        setShowHeart(true);
        generateHearts();
      } else {
        setShowHeart(false);
      }
      setIdx(idx + 1);
    }

    console.log(showHeart);
  };
  const generateHearts = () => {
    const containerWidth = window.innerWidth - 40;
    const containerHeight = window.innerHeight - 40;
    const newHearts: Emoji[] = [];
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      newHearts.push({ x, y });
    }
    setHearts(newHearts);
  };

  useEffect(() => {
    if (inView) {
      carouselAnimation.start("visible");
    }
  }, [inView]);
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            <div className="font-opensans tracking-widest text-center mt-20">
              {!showMessage && (
                <h1 className="text-[24px] md:text-[52px] font-bold text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Hi <span className="text-[#2876FA]">Elijah</span>, <br></br>
                  I'm so happy you're seeing this!
                </h1>
              )}

              {showMessage && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                  <p className="leading-tight text-[22px] flex flex-col md:flex-row text-center justify-center">
                    i love you
                    <motion.span
                      className="inline"
                      key={buttonText}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      {buttonText}
                    </motion.span>
                  </p>
                </div>
              )}

              {showMusic && (
                <iframe
                  className="rounded-2xl m-10"
                  src="https://open.spotify.com/embed/playlist/6RcyXlBjFVWaFkWnTEpL74?utm_source=generator"
                  width="400"
                  height="400"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}

              {showHeart && (
                <div id="heart-container">
                  {hearts.map((heart, index) => (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        left: `${heart.x}px`,
                        top: `${heart.y}px`,
                        fontSize: "40px",
                      }}
                    >
                      💖
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-48 flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button className="" onClick={handleClick}>
            Click me!
          </Button>
        </div>
      </div>
    </div>
  );
}
