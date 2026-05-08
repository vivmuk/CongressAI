import { veniceChat } from "@/lib/venice";
import { agendaSchemaDescription } from "@/lib/schema";
import * as XLSX from "xlsx";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file) return Response.json({ error: "No file uploaded" }, { status: 400 });

    const filename = file.name || "upload";
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";

    if (filename.endsWith(".csv")) {
      // Parse CSV using simple split
      text = parseCSV(buffer);
    } else if (filename.endsWith(".xlsx") || filename.endsWith(".xls")) {
      // Parse XLSX using SheetJS
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetsText = [];
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        if (jsonData.length === 0) continue;
        sheetsText.push(`=== Sheet: ${sheetName} ===`);
        // Get headers from first row
        const headers = Object.keys(jsonData[0]);
        sheetsText.push(headers.join(" | "));
        sheetsText.push("-".repeat(headers.join(" | ").length));
        for (const row of jsonData) {
          sheetsText.push(headers.map((h) => String(row[h] ?? "")).join(" | "));
        }
      }
      text = sheetsText.join("\n");
    } else {
      return Response.json({ error: "Unsupported file type. Please upload .csv or .xlsx files." }, { status: 400 });
    }

    if (!text.trim()) {
      return Response.json({ error: "No extractable text found in file" }, { status: 400 });
    }

    // Truncate very long text
    const maxChars = 50000;
    const truncated = text.length > maxChars ? text.substring(0, maxChars) : text;

    const model = process.env.VENICE_MODEL_REASONING || "kimi-k2-5";
    const fallback = process.env.VENICE_MODEL_FALLBACK || "grok-41-fast";

    const messages = [
      {
        role: "system",
        content: `You extract structured conference agendas from text content (CSV/spreadsheet data). ${agendaSchemaDescription}`,
      },
      {
        role: "user",
        content: truncated,
      },
    ];

    let result;
    try {
      const data = await veniceChat({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });
      result = data.choices[0].message.content;
    } catch {
      const data = await veniceChat({
        model: fallback,
        messages,
        temperature: 0.2,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });
      result = data.choices[0].message.content;
    }

    return new Response(result, { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

function parseCSV(buffer) {
  const raw = buffer.toString("utf-8");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());

  // Detect delimiter
  const firstLine = lines[0] || "";
  let delimiter = ",";
  if (firstLine.split("\t").length > firstLine.split(",").length) {
    delimiter = "\t";
  }

  const rows = lines.map((line) => {
    // Simple CSV parser - handles basic quoting
    const cells = [];
    let current = "";
    let inQuote = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') {
          current += '"';
          i++; // skip escaped quote
        } else {
          inQuote = !inQuote;
        }
      } else if (ch === delimiter && !inQuote) {
        cells.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    cells.push(current.trim());
    return cells;
  });

  // Format as readable text for AI processing
  if (rows.length === 0) return "";

  const headers = rows[0];
  const dataRows = rows.slice(1);

  let text = headers.join(" | ") + "\n";
  text += "-".repeat(headers.join(" | ").length) + "\n";

  for (const row of dataRows) {
    // Pad row to match headers
    const paddedRow = [...row];
    while (paddedRow.length < headers.length) paddedRow.push("");
    text += paddedRow.slice(0, headers.length).join(" | ") + "\n";
  }

  return text;
}