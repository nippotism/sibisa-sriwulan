import Image from "next/image";
import React from "react";
import logo from "/public/images/logo-sibisa.png";

const About = () => {
  return (
    <>
      <div className="dark:bg-gray-950 bg-white">
        <div className="flex md:flex-row flex-col justify-center items-center">
          <Image src={logo} alt="logo" width={400} />
          <div className="dark:text-white text-black md:w-1/2 md:px-0 px-4 space-y-12 font-montserrat">
            <h1 className="text-center md:text-left font-medium text-4xl">
              Tentang <span className="font-bold">SIBISA</span>
            </h1>
            <p className="md:text-2xl text-lg text-pretty text-justify w-full">
              SIBISA adalah program berbasis IoT yang dirancang dengan cinta dan
              dedikasi untuk mengelola limbah di Desa Sriwulan. Aplikasi ini
              memonitor pengelolaan limbah anorganik dan fermentasi pupuk kompos
              dari limbah peternakan. Dilengkapi dengan kader SIBISA, program
              ini menciptakan sistem pengelolaan limbah yang terintegrasi dan
              efektif, memberi manfaat material dan lingkungan bagi masyarakat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
