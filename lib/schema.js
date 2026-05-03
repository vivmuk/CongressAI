export const agendaSchemaDescription = `Return STRICT JSON ONLY. Use this schema:
{
  "conference": {
    "name": string,
    "acronym": string | null,
    "organizer": string | null,
    "website": string | null,
    "location": {
      "city": string | null,
      "state": string | null,
      "country": string | null,
      "venue": string | null,
      "address": string | null
    },
    "dates": {
      "start": string | null,
      "end": string | null,
      "timezone": string | null
    }
  },
  "tracks": [
    {
      "name": string,
      "description": string | null,
      "keywords": string[]
    }
  ],
  "sessions": [
    {
      "id": string,
      "title": string,
      "type": string | null,
      "track": string | null,
      "abstract": string | null,
      "date": string | null,
      "startTime": string | null,
      "endTime": string | null,
      "location": string | null,
      "speakers": [string],
      "moderators": [string],
      "topics": [string],
      "must_attend": boolean | null,
      "priority_reason": string | null
    }
  ],
  "speakers": [
    {
      "name": string,
      "role": string | null,
      "affiliation": string | null,
      "bio": string | null,
      "sessions": [string],
      "topics": [string],
      "speaker_roles": [string],
      "influence_indicators": string[]
    }
  ],
  "sponsors": [
    {
      "name": string,
      "tier": string | null,
      "url": string | null
    }
  ],
  "competitive_intelligence": {
    "competitor_mentions": [
      {
        "name": string,
        "context": string,
        "sentiment": string | null,
        "sessions": [string]
      }
    ],
    "drug_mentions": [
      {
        "name": string,
        "indication": string | null,
        "phase": string | null,
        "company": string | null,
        "sessions": [string]
      }
    ],
    "asset_tracking": [
      {
        "asset_name": string,
        "asset_type": string,
        "company": string | null,
        "status": string | null,
        "sessions": [string]
      }
    ]
  },
  "session_priorities": [
    {
      "session_id": string,
      "must_attend": boolean,
      "reason": string | null,
      "priority_level": string | null
    }
  ],
  "topic_clusters": [
    {
      "cluster_name": string,
      "cluster_keywords": string[],
      "session_ids": [string],
      "description": string | null
    }
  ],
  "themes": [string],
  "keywords": [string],
  "highlights": [string],
  "data_quality": {
    "missing_fields": [string],
    "assumptions": [string]
  }
}
Rules:
- Use null when unknown.
- Do not invent details.
- Arrays can be empty.
- ids must be stable strings; if no id, use slug from title + date.
- speaker_roles can include: "chair", "presenter", "panelist", "moderator", "discussant".
- must_attend means the session has high strategic value.
- competitive_intelligence captures any named competitors, drugs, or assets discussed.
- topic_clusters groups sessions that share common themes or keywords.
`;