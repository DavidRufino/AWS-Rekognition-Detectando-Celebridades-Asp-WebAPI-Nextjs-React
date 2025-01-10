"use server";

import rekognition from "@service/rekognition";

export const getCelebritiesAsync = async (formData) => {
  console.log("Server [getCelebritiesAsync] Start");

  // Fetch the initial batch of items on the server-side
  const response = await rekognition.DetectCelebritiesAsync(formData);
  console.log("Server [getCelebritiesAsync] response", response);

  return response;
};
