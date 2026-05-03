const PUBMED_ESEARCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
const PUBMED_EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi";

export async function searchPublications(query, maxResults = 10) {
  // Step 1: esearch to get PMIDs
  const searchParams = new URLSearchParams({
    db: "pubmed",
    term: query,
    retmax: String(maxResults),
    retmode: "json",
    sort: "relevance",
  });

  let searchRes;
  try {
    searchRes = await fetch(`${PUBMED_ESEARCH_URL}?${searchParams.toString()}`);
    if (!searchRes.ok) throw new Error(`esearch HTTP ${searchRes.status}`);
    const searchData = await searchRes.json();
    const idList = searchData?.esearchresult?.idlist || [];
    if (!idList.length) return [];
    const pmids = idList.slice(0, maxResults);

    // Step 2: efetch to get details
    const fetchParams = new URLSearchParams({
      db: "pubmed",
      id: pmids.join(","),
      retmode: "xml",
    });

    const fetchRes = await fetch(`${PUBMED_EFETCH_URL}?${fetchParams.toString()}`);
    if (!fetchRes.ok) throw new Error(`efetch HTTP ${fetchRes.status}`);
    const xml = await fetchRes.text();

    // Simple XML parsing for PubMed articles
    return parsePubMedXml(xml, pmids);
  } catch (e) {
    console.error("PubMed search error:", e.message);
    return [];
  }
}

function parsePubMedXml(xml, pmids) {
  const results = [];
  const articles = xml.split("<PubmedArticle>").slice(1);

  for (const articleXml of articles) {
    try {
      const pmid = extractTag(articleXml, "<PMID>", "</PMID>") || "";
      const title = extractTag(articleXml, "<ArticleTitle>", "</ArticleTitle>") || "";
      const abstract = extractTag(articleXml, "<AbstractText>", "</AbstractText>") || "";
      const journal = extractTag(articleXml, "<Title>", "</Title>") || "";
      const year = extractTag(articleXml, "<Year>", "</Year>") || "";
      const authors = extractAuthors(articleXml);

      results.push({
        pmid,
        title: cleanText(title),
        authors,
        journal: cleanText(journal),
        year,
        abstract: cleanText(abstract),
        url: pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : "",
      });
    } catch {
      // Skip malformed articles
    }
  }

  return results;
}

function extractTag(xml, openTag, closeTag) {
  const start = xml.indexOf(openTag);
  if (start === -1) return "";
  const end = xml.indexOf(closeTag, start + openTag.length);
  if (end === -1) return "";
  return xml.substring(start + openTag.length, end);
}

function extractAuthors(xml) {
  const authors = [];
  const authorBlocks = xml.split("<Author>").slice(1);
  for (const block of authorBlocks.slice(0, 10)) {
    const last = extractTag(block, "<LastName>", "</LastName>");
    const fore = extractTag(block, "<ForeName>", "</ForeName>");
    if (last) authors.push(fore ? `${last} ${fore}` : last);
  }
  return authors.join(", ");
}

function cleanText(text) {
  return text.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/<[^>]+>/g, "").trim();
}