import React from "react";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <div className="footer w-full h-20 flex justify-center items-center mt-32 xl:mt-28 lg:mt-20 sm:mt-16 relative xsm:mt-10">
      <div className="footer__wrapper w-full">
        <div className="footer__bg -z-1 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{
              marginTop: "-2.5rem",
              width: "100%",
              height: "8rem",
              display: "block",
            }}
          >
            <path
              fill="#A7F3D0"
              d="M0,224L40,218.7C80,213,160,203,240,213.3C320,224,400,256,480,240C560,224,640,160,720,144C800,128,880,160,960,149.3C1040,139,1120,85,1200,96C1280,107,1360,181,1400,218.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="footer__content font-bold flex justify-center items-center w-full h-20 bg-emerald-200 md:h-16 xsm:h-14 -mt-[1px]">
          <span className="icon mr-1 text-emerald-500 mb-4 xsm:mb-2">
            <Zap className="w-5 h-5 fill-primary" />
          </span>
          <div className="footer__title text-gray-700 mb-4 text-lg xsm:text-base xsm:mb-2">
            Developed by{" "}
            <a
              href="https://github.com/KaungKZ/MyMovies"
              target="_blank"
              className="underline font-bold"
              rel="noreferrer"
            >
              KaungKZ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
