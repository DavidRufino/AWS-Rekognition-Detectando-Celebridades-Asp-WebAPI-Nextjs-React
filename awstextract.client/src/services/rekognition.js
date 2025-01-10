const DetectCelebritiesAsync = async (formData) => {
  try {
    const ApiURL = process.env.API_URL;
    const ApiRekognitionEndpoint = process.env.API_REKOGNITION_ENDPOINT;

    /*
    const response = await fetch(
      `http://localhost:3000/rekognitionResultSample.json`,
      {
        method: "GET",
      }
    );*/

    const response = await fetch(`${ApiURL}${ApiRekognitionEndpoint}`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("[DetectCelebritiesAsync] result:", result);
      return result;
    } else {
      console.error(
        "[DetectCelebritiesAsync] Failed to process the file or URL",
        await response.json()
      );
      return [];
    }
  } catch (error) {
    console.error("[DetectCelebritiesAsync] Error:", error);
    return [];
  }
};

export default { DetectCelebritiesAsync };
