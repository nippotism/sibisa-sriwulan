import React from "react";
import city from "/public/images/sibisa.jpg";

const LandingPage = () => {
  return (
    <div
      className="h-screen w-full relative bg-cover bg-center"
      style={{ backgroundImage: `url(https://picsum.photos/600/400?random=3)` }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black dark:bg-white opacity-60 z-0"></div>

      {/* Blur gradients on top and bottom */}
     {/* Blur gradients on top and bottom */}
    <div className="absolute top-0 left-0 w-full h-32 z-10 
      bg-gradient-to-b from-black via-transparent to-transparent 
      dark:from-white dark:via-transparent dark:to-transparent">
    </div>

    <div className="absolute bottom-0 left-0 w-full h-32 z-10 
      bg-gradient-to-t from-black via-transparent to-transparent 
      dark:from-white dark:via-transparent dark:to-transparent">
    </div>


      {/* Content */}
      <div
        className="relative z-20 text-white dark:text-black text-center flex flex-col justify-center items-center h-full space-y-4"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <h1 className="md:text-9xl text-4xl font-semibold font-montserrat tracking-wider">
          DESA SRIWULAN
        </h1>
        <h2 className="md:text-4xl text-2xl font-light tracking-widest font-montserrat">
          The Land of Enchanment
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
