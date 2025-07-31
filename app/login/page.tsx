"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import React from "react";
import logo from "/public/images/logo-sibisa.png";  
import Image from "next/image";

const initialState = { error: "" };

const Auth = () => {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="bg-[#D4D5D5] w-full h-screen px-4 flex flex-col">
      <div className="text-4xl space-y-4 py-8 flex flex-col justify-center max-w-screen-sm mx-auto">
        <Image src={logo} alt="logo" width={200} />
      </div>

      <form action={formAction} className="flex flex-col items-center text-lg flex-grow">
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Masukkan email"
            className="bg-blue rounded-xl px-4 py-2 border-2 border-[#3C5480]"
            required
          />
        </div>
        <div className="flex flex-col items-start mt-4">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan password"
            className="bg-blue rounded-xl px-4 py-2 border-2 border-[#3C5480]"
            required
          />
        </div>

        {state?.error && (
          <p className="text-red-600 mt-4">Password atau username tidak sesuai</p>
        )}
        <Button
          type="submit"
          className="px-16 mt-12 rounded-2xl bg-[#3C5480]"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Auth;
