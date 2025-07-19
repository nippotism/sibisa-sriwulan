import Image from "next/image";
import React from "react";
import element from "/public/images/element-titik.png";

const data3R = [
  {
    title: "Reduce",
    description:
      "Mengurangi jumlah sampah yang dihasilkan dengan menggunakan produk lebih sedikit atau memilih produk yang tahan lama.",
  },
  {
    title: "Reuse",
    description:
      "Memanfaatkan kembali barang-barang yang masih bisa digunakan daripada membuangnya.",
  },
  {
    title: "Recycle",
    description:
      "Mengolah kembali sampah menjadi produk baru untuk mengurangi kebutuhan akan bahan baku baru.",
  },
];

const Box3R = () => {
  return (
    <div className="relative flex lg:flex-row space-y-6 px-4 flex-col justify-evenly items-center font-montserrat">
      <Image
        src={element}
        alt="titik"
        height={50}
        width={330}
        className="absolute lg:block hidden left-0 top-0 z-0"
      />
      {data3R.map((item, index) => (
        <div
          key={index}
          className="dark:bg-white bg-gray-900 text-white dark:text-black border-spacing-2 border-black w-72 lg:w-96 lg:h-96  space-y-4 shadow-2xl px-6 py-16 rounded-2xl z-10"
        >
          <h1 className="font-semibold md:text-3xl text-2xl text-center">
            {item.title}
          </h1>
          <p className="text-justify md:text-2xl text-lg">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Box3R;
