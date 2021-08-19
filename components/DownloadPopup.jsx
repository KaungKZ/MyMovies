import React from "react";

export default function DownloadPopup({ isOpen }) {
  console.log(isOpen);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   }
  // }, [isOpen]);
  return (
    <>
      {/* <div className="download-overlay w-full h-full fixed bg-gray-800 top-0 left-0 opacity-50 z-100"></div> */}
      <div className="download fixed w-80 bg-gray-100 p-10 h-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="download__container"></div>
      </div>
    </>
  );
}
