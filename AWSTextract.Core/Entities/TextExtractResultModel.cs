﻿using AWSTextract.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AWSTextract.Core.Entities
{
    public class TextExtractResultModel
    {
        public string? ExtractedText { get; set; }
        public List<TableModel> Tables { get; set; } = new List<TableModel>();
        public List<FormModel> Forms { get; set; } = new List<FormModel>();
    }

    public class TableModel
    {
        public List<List<string>> Rows { get; set; } = new List<List<string>>();
    }

    public class FormModel
    {
        public string? Name { get; set; }
        public string? Value { get; set; }
    }
}