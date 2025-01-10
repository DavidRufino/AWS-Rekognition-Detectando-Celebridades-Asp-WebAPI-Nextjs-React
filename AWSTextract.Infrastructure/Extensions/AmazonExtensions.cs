﻿using Amazon;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Rekognition;
using Amazon.Runtime;
using Amazon.Textract;
using AWSTextract.Core.Interfaces;
using AWSTextract.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

namespace AWSTextract.Infrastructure.Extensions
{
    /// <summary>
    /// Métodos de extensão para configurar serviços relacionados ao Amazon.
    /// </summary>
    public static class AmazonExtensions
    {
        /// <summary>
        /// Método que configura e registra todos os serviços necessários para a camada de infraestrutura.
        /// Ele registra tanto os serviços da AWS quanto nossos serviços customizados.
        /// </summary>
        /// <param name="services">A coleção de serviços para injeção de dependência.</param>
        /// <param name="configuration">As configurações do aplicativo (tipo appsettings.json).</param>
        /// <returns>A coleção de serviços com os serviços da AWS e personalizados registrados.</returns>
        public static IServiceCollection AddAmazonServices(this IServiceCollection services, IConfiguration configuration)
        {
            Debug.WriteLine($"[AddAmazonServices] Start");

            var region = configuration["AWS:Region"];
            var accessKey = configuration["AWS:AccessKey"];
            var secretKey = configuration["AWS:SecretKey"];
            Debug.WriteLine($"[AddAmazonServices] AWS Region: {region}");

            AWSOptions awsOptions = new AWSOptions
            {
                Credentials = new BasicAWSCredentials(accessKey, secretKey),
                Region = RegionEndpoint.USEast1
            };

            // Configura os serviços da AWS pegando as configs do appsettings.json
            // Exemplo: região, AccessKey e SecretKey.
            services.AddDefaultAWSOptions(awsOptions);
            //services.AddDefaultAWSOptions(configuration.GetAWSOptions("AWS"));

            #region Services
            // Registra o cliente da AWS Textract (IAmazonTextract) para processar documentos.
            services.AddAWSService<IAmazonTextract>();

            // Registra o cliente da AWS Rekognition (IAmazonRekognition) para processar documentos.
            services.AddAWSService<IAmazonRekognition>();
            #endregion

            #region Scopes
            // Adiciona nosso TextractService, que implementa a lógica personalizada.
            // Ele segue o contrato definido na interface ITextractService.
            services.AddScoped<ITextractService, TextractService>();

            // Adiciona nosso RekognitionService, que implementa a lógica personalizada.
            // Ele segue o contrato definido na interface IRekognitionService.
            services.AddScoped<IRekognitionService, RekognitionService>();
            #endregion

            // Retorna os serviços registrados (DI configurado).
            return services;
        }
    }
}