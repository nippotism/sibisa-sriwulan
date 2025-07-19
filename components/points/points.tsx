import Image, { StaticImageData } from "next/image";
import farmer from "/public/images/farmer.png";
import point1 from "/public/images/point1.png";
import point2 from "/public/images/point2.png";
import point3 from "/public/images/point3.png";
import point4 from "/public/images/point4.png";
import point5 from "/public/images/point5.png";

type Point = {
  src: StaticImageData;
  text: string;
};

const points: Point[] = [
  {
    src: point1,
    text: "Mengumpulkan kotoran sapi yang segar dan bersih dari batu maupun benda asing.",
  },
  {
    src: point2,
    text: "Untuk mempercepat proses dapat ditambahkan bakteri fermentator EM4. Fungsi dari bakteri EM4 dapat diaktifkan dengan mencampur 2-3 sendok EM4 dengan 3-4 sendok gula untuk 1,5 liter air dan biarkan semalaman.",
  },
  {
    src: point3,
    text: "Lakukan penutupan kotoran dan pastikan sudah rapat sehingga terjadi fermentasi kedap udara (anaerob).",
  },
  {
    src: point4,
    text: "Proses pengomposan ditandai dengan dengan suhu panas di permukaan bakal kompos. Selama waktu ini, kita dapat mengaduk-aduk bahannya 3 hari sekali untuk membantu proses aerasi.",
  },
  {
    src: point5,
    text: "Tanda pengomposan sudah selesai adalah saat suhunya tidak tinggi lagi.",
  },
];

const Points = () => (
  <div className="flex flex-row text-2xl dark:text-black text-white text-justify  justify-center font-montserrat">
    <Image src={farmer} className="md:block hidden" alt="farmer" width={400} />
    <div className="mt-16 md:w-7/12 px-4 md:px-0 flex flex-col justify-start ">
      <p className="mb-8 md:text-3xl text-lg">
        Pembuatan pupuk organik dari kotoran sapi dapat dilakukan dengan :
      </p>
      <div className="space-y-8">
        {points.map((point, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-start md:text-2xl text-lg"
          >
            <Image src={point.src} alt={`point${index + 1}`} />
            <p>{point.text}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Points;
