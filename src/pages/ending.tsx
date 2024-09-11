import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";

export default function Index() {
  return (
    <div>
      <h1 className="font-opensans tracking-widest text-center text-[24px] md:text-[52px] font-bold text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        I'm blessed to have you as my boyfriend :)
      </h1>
      <div className="mt-[600px] mx-32 flex flex-row">
        <iframe
          className="rounded-2xl "
          src="https://open.spotify.com/embed/playlist/6RcyXlBjFVWaFkWnTEpL74?utm_source=generator"
          width="400"
          height="400"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <Image
          src={"/bagsecured.png"}
          alt="logo"
          width={100}
          height={100}
          className="rounded-md w-48 h-48 m-16"
        ></Image>
        <iframe
          className="rounded-2xl"
          src="https://open.spotify.com/embed/playlist/6kasksF1WcTcDHaN7c3abD?utm_source=generator&autoplay=1"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
