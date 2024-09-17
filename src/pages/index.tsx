import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const router = useRouter();
  const carouselAnimation = useAnimation();
  const [showMessage, setShowMessage] = useState(false);
  // const [showHeart, setShowHeart] = useState(false);
  // const [showMusic, setShowMusic] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [imagePath, setImagePath] = useState("");
  const phrases = [
    { text: "I love your spunky reactions *nuhh-uhh* *dang--*", imagepath: "/rawr.gif" },
    {
      text: "I love your cheezy grin when you see me",
      imagepath: "/sparkle.gif",
    },
    { text: "I love your endless thoughtfulness", imagepath:"/snuggle.gif" },
    { text: "I love your prayerfulness--it's very grounding!", imagepath: "/love.gif" },
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
      setButtonText(phrases[idx].text);
      setImagePath(phrases[idx].imagepath)
      setIdx(idx + 1);
    }
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 md:text-[36px] whitespace-normal break-words">
                  <motion.span
                    className="flex flex-col items-center"
                    key={buttonText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  >
                    <div>{buttonText}</div>
                    <Image
                      src={imagePath}
                      alt="supposed to be a picture"
                      width={200}
                      height={200}
                      priority
                    ></Image>
                  </motion.span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-64 flex justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button className="" onClick={handleClick}>
            Click me!
          </Button>
        </div>
      </div>
    </div>
  );
}
