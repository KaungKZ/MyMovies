import React from "react";
// import { Video } from "lucide-react";
import Image from "next/image";

export default function SectionHeader({ title, icon }) {
  return (
    <>
      <div className="relative flex items-center space-x-2">
        <h1 className="text-3xl font-bold text-gray-700 underline title smmx:text-2xl">
          {title}
        </h1>
        {icon && (
          <span>
            {/* <Video className="h-7 w-7 text-primary fill-primary" /> */}
            {icon}
          </span>
        )}

        <div className="absolute left-0 top-0 -translate-x-[45px] -translate-y-[60px] -z-10 mdmx:-translate-x-[34px] mdmx:-translate-y-[30px]">
          <Image
            src="/assets/section-title-bg-shape.png"
            width="143"
            height="130"
            alt="section title bg shape"
            className=" mdmx:w-[100px] mdmx:h-[87px]"
          />
        </div>
      </div>
    </>
  );
}
