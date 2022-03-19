import React from "react";

export default function DownloadPopup({ isOpen, result }) {
  // console.log(isOpen);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   }
  // }, [isOpen]);
  return (
    <>
      {/* <div className="download-overlay w-full h-full fixed bg-gray-800 top-0 left-0 opacity-50 z-100"></div> */}
      <div className="download fixed bg-gray-100 p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:overflow-y-auto sm:h-2/3">
        <div className="download__container">
          <h1 className="text-center pb-4 font-bold">Select Movie Quality</h1>
          <div className="flex flex-row justify-center align-center space-x-3 sm:space-x-0 sm:flex-col sm:space-y-3 ">
            {result.map((dInfo, index) => (
              <div
                key={index}
                className="flex flex-col text-center space-y-3 border-r-4 last:border-0 px-3 sm:px-0 sm:pb-2 sm:border-r-0 sm:border-b-4 sm:last:border-0"
              >
                <a
                  href={dInfo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-8 bg-emerald-400 rounded text-white hover:bg-emerald-500 transition flex items-center text-base self-center"
                >
                  {dInfo.quality}
                </a>
                <p>{dInfo.type.toUpperCase()}</p>
                <p>{dInfo.size}</p>
                <a
                  href={`magnet:?xt=urn:btih:${dInfo.hash}`}
                  className="text-red-700"
                >
                  Magnet
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
