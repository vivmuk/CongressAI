export const VENICE_BASE_URL = process.env.VENICE_BASE_URL || "https://api.venice.ai/api/v1";

export function getVeniceKey() {
  const key = process.env.VENICE_API_KEY;
  if (!key) throw new Error("VENICE_API_KEY not set");
  return key;
}

export function buildHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getVeniceKey()}`,
  };
}

const VENICE_TIMEOUT_MS = 60000;

async function veniceFetch(url, options) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VENICE_TIMEOUT_MS);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') throw new Error('Venice API request timed out after 60s');
    throw err;
  }
}

export async function veniceChat({ model, messages, temperature = 0.3, max_tokens = 2000, venice_parameters, response_format }) {
  const res = await veniceFetch(`${VENICE_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens,
      response_format,
      venice_parameters,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice chat error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function veniceEmbeddings({ model, input }) {
  const res = await veniceFetch(`${VENICE_BASE_URL}/embeddings`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ model, input }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice embeddings error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function veniceTTS({ model, input, voice = "af_nova", speed = 1.0 }) {
  const res = await veniceFetch(`${VENICE_BASE_URL}/audio/speech`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ model, input, voice, speed }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice TTS error ${res.status}: ${text}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function veniceTranscribe({ model, file, filename, contentType }) {
  const form = new FormData();
  form.append("model", model);
  form.append("file", new Blob([file], { type: contentType }), filename);
  const res = await veniceFetch(`${VENICE_BASE_URL}/audio/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getVeniceKey()}`,
    },
    body: form,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice STT error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function veniceModels() {
  const res = await veniceFetch(`${VENICE_BASE_URL}/models?type=text,image,audio,embedding`, {
    headers: { Authorization: `Bearer ${getVeniceKey()}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice models error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function veniceImageGenerate({ model, prompt, width = 1024, height = 1024, steps = 30, seed, negative_prompt, style }) {
  const body = {
    model: model || process.env.VENICE_MODEL_IMAGE || "flux-dev",
    prompt,
    width,
    height,
    steps,
  };
  if (seed !== undefined) body.seed = seed;
  if (negative_prompt) body.negative_prompt = negative_prompt;
  if (style) body.style = style;

  const res = await veniceFetch(`${VENICE_BASE_URL}/image/generate`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice image generate error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function veniceImageEdit({ model, image, prompt, mask, width, height, steps, seed, negative_prompt }) {
  const body = {
    model: model || process.env.VENICE_MODEL_IMAGE || "flux-dev",
    image,
    prompt,
  };
  if (mask) body.mask = mask;
  if (width) body.width = width;
  if (height) body.height = height;
  if (steps) body.steps = steps;
  if (seed !== undefined) body.seed = seed;
  if (negative_prompt) body.negative_prompt = negative_prompt;

  const res = await veniceFetch(`${VENICE_BASE_URL}/image/edit`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice image edit error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function veniceResponses({ model, input, instructions, temperature = 0.3, max_tokens = 2000 }) {
  const body = {
    model: model || process.env.VENICE_MODEL_CHAT || "deepseek-v3.2",
    input,
    temperature,
    max_output_tokens: max_tokens,
  };
  if (instructions) body.instructions = instructions;

  const res = await veniceFetch(`${VENICE_BASE_URL}/responses`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Venice responses error ${res.status}: ${text}`);
  }
  return res.json();
}