using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AWSTextract.Core.Entities
{
    public class RekognitionCelebrityResultModel
    {
        public List<CelebrityResultModel> RecognizedFaces { get; set; }
        public List<CelebrityResultModel> UnrecognizedFaces { get; set; }
    }

    public class CelebrityResultModel
    {
        /// <summary>
        /// ID único da celebridade reconhecida.
        /// </summary>
        [JsonPropertyName("id")]
        public string Id { get; set; }

        /// <summary>
        /// Nome da celebridade reconhecida.
        /// </summary>
        [JsonPropertyName("name")]
        public string Name { get; set; }

        /// <summary>
        /// Posição do rosto da celebridade, representada como uma caixa delimitadora (Bounding Box).
        /// </summary>
        [JsonPropertyName("face")]
        public BoundingBoxModel Face { get; set; }

        /// <summary>
        /// Lista de URLs relacionadas à celebridade reconhecida (por exemplo, páginas ou imagens).
        /// </summary>
        [JsonPropertyName("url")]
        public List<string> Url { get; set; }
    }

    public class FacesResultModel
    {
        [JsonPropertyName("face")]
        public BoundingBoxModel Face { get; set; }

        [JsonPropertyName("confidence")]
        private float? Confidence;

        [JsonPropertyName("emotion")]
        public List<(float? Confidence, string Type)> Emotion { get; set; }
    }

    public partial class BoundingBoxModel
    {
        /// <summary>
        /// Largura da caixa delimitadora (Bounding Box) do rosto.
        /// </summary>
        [JsonPropertyName("width")]
        public float? Width { get; set; }

        /// <summary>
        /// Altura da caixa delimitadora (Bounding Box) do rosto.
        /// </summary>
        [JsonPropertyName("height")]
        public float? Height { get; set; }

        /// <summary>
        /// Posição horizontal (esquerda) da caixa delimitadora (Bounding Box) do rosto.
        /// </summary>
        [JsonPropertyName("left")]
        public float? Left { get; set; }

        /// <summary>
        /// Posição vertical (superior) da caixa delimitadora (Bounding Box) do rosto.
        /// </summary>
        [JsonPropertyName("top")]
        public float? Top { get; set; }
    }

}