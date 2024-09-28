import React, { useLayoutEffect, useRef } from "react";
import Deck from "@/components/polaroid/polaroid";

const PHOTOS = [
  {
    url: "05.jpg",
    orientation: "portrait",
  },
  {
    url: "04.jpg",
    orientation: "portrait",
  },
  {
    url: "03.jpg",
    orientation: "portrait",
  },
  {
    url: "02.jpg",
    orientation: "landscape",
  },
  {
    url: "01.jpg",
    orientation: "portrait",
  },
];

export default function Index() {
  return (
    <div>
      <h1 className="font-opensans tracking-widest text-center text-[24px] md:text-[52px] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Happy Boyfriend Day :) <br></br>
        Love you lots!<br></br>
        <br></br>
        <Deck cards={PHOTOS}></Deck>
      </h1>
    </div>
  );
}
