import React from "react";

const Denah: React.FC = () => {
  return (
    <>
      <h1 className="text-white dark:text-black md:text-3xl text-xl mt-4 font-medium text-center">
        Titik Rumah <span className="font-bold">Digital</span>
      </h1>
      <div className="flex flex-col items-center mt-8">
        <div className="bg-white md:px-36 px-4 py-8 rounded-2xl shadow-2xl w-full h-[500px]">
          <iframe
            className="h-full w-full border-0"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8
            &q=-7.149576801329801,110.29685356062552&zoom=15`}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Denah;
