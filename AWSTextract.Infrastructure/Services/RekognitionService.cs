using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.Runtime.Internal;
using Amazon.Runtime;
using AWSTextract.Core.Entities;
using AWSTextract.Core.Interfaces;
using AWSTextract.Infrastructure.Mappers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace AWSTextract.Infrastructure.Services
{
    public class RekognitionService : IRekognitionService
    {
        private readonly IAmazonRekognition _regkognitionClient;

        /// <summary>
        /// Construtor que recebe o cliente da AWS Rekognition.
        /// </summary>
        /// <param name="regkognitionClient">Cliente da AWS Rekognition injetado pela DI.</param>
        public RekognitionService(IAmazonRekognition regkognitionClient) => this._regkognitionClient = regkognitionClient;
        
        public async Task<object> CelebritiesInImageAsync(byte[] fileBytes)
        {
            Debug.WriteLine("[CelebritiesInImageAsync] Start");

            // Cria a requisição para o Recognize com a Image como byte array.
            RecognizeCelebritiesRequest recognizeCelebritiesRequest = new RecognizeCelebritiesRequest()
            {
                Image = new Image()
                {
                    Bytes = ConvertStreamToByteArray(fileBytes)
                }
            };

            try
            {
                Debug.WriteLine("[CelebritiesInImageAsync] Procurando celebridades em imagem...");

                // Faz a chamada assíncrona para a AWS Rekognition e recebe a resposta.
                var response = await _regkognitionClient.RecognizeCelebritiesAsync(recognizeCelebritiesRequest);

                var dqwdqw = JsonSerializer.Serialize(response);
                Debug.WriteLine("[CelebritiesInImageAsync] response:");
                Debug.WriteLine(dqwdqw);

                return response;
            }
            catch (AmazonServiceException ex)
            {
                Debug.WriteLine($"[CelebritiesInImageAsync] Service error: {ex.Message}");
                Debug.WriteLine($"[CelebritiesInImageAsync] Error code: {ex.ErrorCode}");
                Debug.WriteLine($"[CelebritiesInImageAsync] Request ID: {ex.RequestId}");
                throw;
            }
            catch (Exception ex)
            {
                Debug.WriteLine($"[CelebritiesInImageAsync] Unexpected error: {ex.Message}");
                throw;
            }
        }

        private MemoryStream ConvertStreamToByteArray(byte[] fileBytes)
        {
            using (var memoryStream = new MemoryStream(fileBytes))
                return memoryStream;
        }
    }
}
