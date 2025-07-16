import Image from "next/image";
import React from "react";
import gambar from "/public/images/sibisa.jpg";

const SelamatDatang = () => {
  return (
    <div className="mb-8">
      <div className="mx-auto flex items-center w-10/12 my-8">
        <div className="border-t-4 border-[#BF5638] w-9/12"></div>
        <div className="border-t-4 border-transparent w-1/12"></div>
        <div className="border-t-4 border-[#BF5638] w-2/12"></div>
      </div>
      <h1 className="text-[#3C5480] text-center md:text-4xl text-2xl md:px-0 px-16 font-medium my-12">
        Selamat Datang Di <span className="font-bold">Desa Sriwulan</span>
      </h1>
      <div className="flex md:flex-row flex-col justify-center gap-8">
        <div className="p-2">
          <Image
            src={gambar}
            alt="gambar"
            width={550}
            className="rounded-xl md:hidden md:px-0"
          />
        </div>
        <p className="text-pretty text-justify md:w-1/3 w-full md:px-0 px-8 md:text-2xl text-lg text-[#3C5480] font-raleway font-extralight">
          Desa Sriwulan terletak di Kecamatan Limbangan, Kendal, Jawa Tengah,
          terkenal dengan keindahan alamnya, terutama di Desa Wisata Arenan
          Kalikesek. Namun, masalah limbah dari aktivitas masyarakat, wisata,
          dan peternakan menjadi tantangan besar. Tim PPK Ormawa BEM FT Undip
          berkolaborasi dengan masyarakat untuk merumuskan solusi melalui
          program pembentukan Rumah Sampah Digital.
        </p>
        <Image
          src={gambar}
          alt="gambar"
          width={550}
          className="rounded-xl md:block hidden"
        />
      </div>
    </div>
  );
};

export default SelamatDatang;
