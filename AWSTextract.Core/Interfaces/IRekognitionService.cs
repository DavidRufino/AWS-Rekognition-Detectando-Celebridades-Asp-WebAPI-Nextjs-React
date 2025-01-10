using AWSTextract.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Core.Interfaces
{
    public interface IRekognitionService
    {
        Task<object> CelebritiesInImageAsync(byte[] fileBytes);
    }
}