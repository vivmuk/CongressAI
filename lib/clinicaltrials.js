const CT_API_BASE = "https://clinicaltrials.gov/api/v2";

export async function searchTrials(query, maxResults = 10) {
  try {
    const params = new URLSearchParams({
      query: query,
      pageSize: String(maxResults),
      format: "json",
      fields: "NCTId,BriefTitle,OverallStatus,Phase,Condition,Sponsor,OfficialTitle",
    });

    const res = await fetch(`${CT_API_BASE}/studies?${params.toString()}`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ClinicalTrials API error ${res.status}: ${text}`);
    }
    const data = await res.json();
    const studies = data?.studies || [];

    return studies.map((study) => {
      const protocol = study.protocolSection || {};
      const identification = protocol.identificationModule || {};
      const statusModule = protocol.statusModule || {};
      const descriptionModule = protocol.descriptionModule || {};
      const conditionsModule = protocol.conditionsModule || {};
      const sponsorModule = protocol.sponsorCollaboratorsModule || {};

      return {
        nct_id: identification.nctId || "",
        title: identification.briefTitle || "",
        status: statusModule.overallStatus || "",
        phase: (statusModule.phases || []).join(", ") || "",
        condition: (conditionsModule.conditions || []).join(", ") || "",
        sponsor: sponsorModule.leadSponsor?.name || "",
        url: identification.nctId ? `https://clinicaltrials.gov/study/${identification.nctId}` : "",
      };
    });
  } catch (e) {
    console.error("ClinicalTrials search error:", e.message);
    return [];
  }
}