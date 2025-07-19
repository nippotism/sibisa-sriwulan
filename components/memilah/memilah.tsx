import React from "react";
import {Accordion, AccordionItem} from "@heroui/accordion";
import accordionData from "@/lib/constant/accordion";
import Box3R from "../box/box";
import Points from "../points/points";

const memilah = () => {
  return (
    <>
      <div className="mx-auto flex items-center w-10/12 my-8">
        <div className="border-t-4 dark:border-gray-800 border-gray-100 w-9/12"></div>
        <div className="border-t-4 border-transparent w-1/12"></div>
        <div className="border-t-4 dark:border-gray-800 border-gray-100 w-2/12"></div>
      </div>
      <div>
        <h1 className="text-white dark:text-gray-800 font-montserrat font-medium md:text-4xl text-2xl text-center my-8">
          Tahapan Memilah <span className="font-bold">Sampah</span>
        </h1>
      </div>
      <div className="w-10/12 mx-auto">
        <Accordion className="text-white dark:text-gray-800 font-montserrat" variant="light">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              className="text-xl text-left font-semibold"
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex flex-col items-center text-white dark:text-black font-montserrat">
        <h1 className="font-medium md:text-4xl text-xl text-center mt-8">
          Memilah Sampah <span className="font-bold">Anorganik</span>
        </h1>
        <p className="md:text-2xl text-lg text-pretty text-justify w-10/12 my-8">
          SIBISA adalah program berbasis IoT yang dirancang dengan cinta dan
          dedikasi untuk mengelola limbah di Desa Sriwulan. Aplikasi ini
          memonitor pengelolaan limbah anorganik dan fermentasi pupuk kompos
          dari limbah peternakan. Dilengkapi dengan kader SIBISA, program ini
          menciptakan sistem pengelolaan limbah yang terintegrasi dan efektif,
          memberi manfaat material dan lingkungan bagi masyarakat.
        </p>
        <p className="md:text-2xl text-lg text-pretty text-justify w-10/12 mb-8">
          Sampah anorganik yang telah dipilah dapat diolah dengan prinsip 3R
          (reuse, reduce, dan recycle)
        </p>
      </div>
      <Box3R />
      <div className="z-10 relative mt-20 flex flex-col items-center dark:text-black text-white space-y-8 font-montserrat " id="fermentasi">
        <h1 className="md:text-4xl text-2xl font-medium px-4">
          Pengolahan Limbah Organik Atau{" "}
          <span className="font-bold">Fermentasi Pupuk</span>
        </h1>
        <p className="md:w-10/12 px-4 text-justify md:text-2xl text-lg tracking-wide">
          Desa Sriwulan memiliki limbah organik berupa kotoran sapi yang cukup
          menjadi perhatian khusus bagi masyarakat setempat. Penumpukan limbah
          kotoran sapi ternyata menyimpan potensi besar dengan kita alih
          fungsikan menjadi pupuk yang bermanfaat untuk pertumbuhan tanaman.
        </p>
      </div>
      <Points />
    </>
  );
};

export default memilah;
