import React from 'react'

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
      <div className='download fixed w-80 bg-gray-100 p-10 h-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <div className='download__container mx-3'>
          <div className='flex flex-row translate-y-1/3 justify-center align-center space-x-3'>
            {result.map((dInfo, index) => (
              <button
                key={index}
                className='py-3 px-6 bg-green-400 rounded text-white hover:bg-green-500 transition flex items-center text-base'
              >
                <a href={dInfo.url}>{dInfo.quality}</a>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
