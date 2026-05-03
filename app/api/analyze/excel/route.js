import { veniceChat } from "@/lib/venice";
import { agendaSchemaDescription } from "@/lib/schema";

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
      // For xlsx, extract raw text content (binary) and send to Venice for structuring
      // We can't parse xlsx without a library, so we extract what we can and use AI
      text = buffer.toString("utf-8").replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ").trim();
      // Filter to just readable content
      const lines = text.split(/\n/).filter((l) => l.trim().length > 10);
      text = lines.join("\n");
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