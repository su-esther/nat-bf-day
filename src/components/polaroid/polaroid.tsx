import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

import * as utils from "./utils";
export default function Deck({ cards }: any) {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...utils.to(i),
    from: utils.from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!active && gone.size === cards.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => utils.to(i));
        }, 600);
    }
  );
  return (
    <div className="overflow-x-clip">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <div className="fixed w-full flex items-center justify-center flex-col">
            <animated.div
              {...bind(i)}
              className="bg-cover bg-center will-change-transform border-solid border-[20px] border-b-1 rounded-[6px] border-white"
              style={{
                transform: interpolate([rot, scale], utils.trans),
                backgroundImage: `url(img/${cards[i].url})`,
                width: cards[i].orientation === "portrait" ? "240px" : "320px",
                height: cards[i].orientation === "portrait" ? "320px" : "240px",
              }}
              rel="preload"
            ></animated.div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
