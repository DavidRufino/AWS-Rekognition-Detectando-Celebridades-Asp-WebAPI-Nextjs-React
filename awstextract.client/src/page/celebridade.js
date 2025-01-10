"use client";

import { useState, useTransition } from "react";

import { getCelebritiesAsync } from "@action/rekognition";

import BoundingBox from "@component/boundingBox";
import DocumentDialog from "@component/rekognitionDialog";

import clsx from "clsx";

export default function CelebridadePage() {
  const [isPending, startTransition] = useTransition();

  const [image, setImage] = useState("/FO9tY12XoAgfMpr.jpg");
  const [rekognition, setRekognition] = useState([]);

  async function handleExtractText(formData) {
    console.log("[CelebridadePage] formData", formData);

    setRekognition([]); // Resetar

    startTransition(async () => {
      const celebritiesResult = await getCelebritiesAsync(formData);
      setRekognition(celebritiesResult.rekognition);

      console.log(
        "[CelebridadePage] celebritiesResult:",
        JSON.stringify(celebritiesResult.rekognition)
      );
    });
  }

  return (
    <main className="w-full flex flex-col gap-4">
      <nav
        className={clsx(
          "relative w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 px-4 sm:px-6 lg:px-8 py-2"
        )}
      >
        <div className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow">
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div
              data-hs-scrollspy="#scrollspy"
              className="py-2 md:py-0 [--scrollspy-offset:220] md:[--scrollspy-offset:70] flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1"
            >
              <DocumentDialog
                name={"Celebridade"}
                handleExtract={handleExtractText}
                fileChanged={setImage}
                isPending={isPending}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className={clsx("flex")}>
        <div className="flex-1 px-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Project - Detectando Celebridades em Imagens com AWS Rekognition
          </h1>
          <p className="mt-1 text-gray-600">
            Neste desafio, é utilizado o AWS Rekognition para identificar
            automaticamente celebridades em imagens, explorando recursos de
            análise visual na nuvem.
          </p>
        </div>
      </section>

      <section className={clsx("px-6 my-4 h-screen overflow-auto")}>
        <div className="relative max-h-screen rounded-lg w-full h-full ">
          <BoundingBox imageSrc={image} data={rekognition} />
        </div>
      </section>
      {/* END Content */}
    </main>
  );
}
