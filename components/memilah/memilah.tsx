import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import accordionData from "@/lib/constant/accordion";
import Box3R from "../box/box";
import Points from "../points/points";

const memilah = () => {
  return (
    <>
      <div className="mx-auto flex items-center w-10/12 my-8">
        <div className="border-t-4 border-gray-400 w-9/12"></div>
        <div className="border-t-4 border-transparent w-1/12"></div>
        <div className="border-t-4 border-gray-400 w-2/12"></div>
      </div>
      <div>
        <h1 className="text-white dark:text-black font-medium md:text-4xl text-2xl text-center my-8">
          Tahapan Memilah <span className="font-bold">Sampah</span>
        </h1>
      </div>
      <div className="w-10/12 mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index + 1}`}
              className="text-white dark:text-black dark:bg-white bg-gray-900 border-4 border-gray-400 dark:border-gray-950 rounded-2xl p-2 mb-4"
            >
              <AccordionTrigger className="font-bold md:text-xl text-lg text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <hr className="border-t-4 border-gray-400" />
                <p className="text-justify md:text-xl text-sm mt-4 text-white dark:text-black">
                  {item.content}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex flex-col items-center text-white dark:text-black">
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
      <div className="z-10 relative mt-20 flex flex-col items-center text-white dark:text-black space-y-8 " id="fermentasi">
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