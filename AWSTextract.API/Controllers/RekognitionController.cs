using AWSTextract.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AWSTextract.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RekognitionController : ControllerBase
    {
        private readonly IRekognitionService _rekognitionService;

        // Constructor that gets the RekognitionService via DI
        public RekognitionController(IRekognitionService rekognitionService) => this._rekognitionService = rekognitionService;

        // É necessário configurar o Swagger para suportar o envio de arquivos com IFormFile
        // POST method to extract text from an external URL
        [ApiExplorerSettings(IgnoreApi = true)] // Hides from Swagger
        [HttpPost("detect-celebrities")]
        public async Task<IActionResult> DetectCelebritiesAsync([FromForm] IFormFile? file, [FromForm] string? fileUrl)
        {
            if (file == null && string.IsNullOrEmpty(fileUrl))
                return BadRequest("Você deve fornecer um arquivo ou um URL de arquivo.");

            try
            {
                // Get the document content from file or URL
                byte[]? fileContent = null;

                if (file != null)
                {
                    using (var stream = new MemoryStream())
                    {
                        // Copy file content to memory stream
                        await file.CopyToAsync(stream);

                        // Convert stream to byte array
                        fileContent = stream.ToArray();
                    }
                }
                else if (!string.IsNullOrEmpty(fileUrl))
                {
                    using (var httpClient = new HttpClient())
                    {
                        try
                        {
                            // Fetch the file content as byte array
                            fileContent = await httpClient.GetByteArrayAsync(fileUrl);
                        }
                        catch (Exception ex)
                        {
                            return BadRequest("Falha ao baixar o arquivo do URL fornecido");
                        }
                    }
                }

                // Check the size of the file content
                if (fileContent?.Length > 0) Debug.WriteLine($"Tamanho do conteúdo do arquivo: {fileContent.Length} bytes");
                else Debug.WriteLine("O conteúdo do arquivo está vazio ou não foi carregado.");

                if (fileContent?.Length < 1) return BadRequest("Nenhum arquivo carregado.");

                var detectedCelebrities = await _rekognitionService.CelebritiesInImageAsync(fileContent);
                return Ok(new { Rekognition = detectedCelebrities });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
