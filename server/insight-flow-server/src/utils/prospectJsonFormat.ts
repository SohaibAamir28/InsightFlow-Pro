export const prospectFormat = {
  "persona": {
      "dataProfile": {
          "name": "string",
          "industry": "string",
          "organizationSize": {
              "employees": "number",
              "annualBudget": "string"
          },
          "location": {
              "headquarters": "string",
              "operationalRegions": ["string"]
          },
          "establishedYear": "number"
      },
      "projectProfile": {
          "dataNeed": "string",
          "targetOutcome": "string",
          "uniqueChallenges": "string",
          "projectStage": "string",
          "technologyAdoptionLevel": 0-10
      },
      "keyStakeholders": [
          {
              "role": "string",
              "dataChallenges": ["string"],
              "interests": ["string"],
              "communicationPreference": "string"
          }
      ],
      "financialOverview": {
          "budgetHealth": 0-10,
          "fundingFlow": 0-10,
          "debtRatio": 0-10,
          "investmentPotential": 0-10
      },
      "dataPosition": {
          "analyticalAdvantage": "string",
          "dataCoverage": 0-10,
          "dataAwareness": 0-10,
          "dataLoyalty": 0-10
      },
      "obstacles": [
          {
              "description": "string",
              "severity": 0-10,
              "recommendedSolution": "string"
          }
      ],
      "opportunities": [
          {
              "description": "string",
              "potentialImpact": 0-10,
              "alignmentWithOurExpertise": 0-10
          }
      ],
      "implementationReadiness": {
          "awarenessTrigger": "string",
          "projectPhase": "string",
          "decisionTimeline": "string",
          "budgetCommitment": 0-10
      },
      "collaborationHistory": {
          "previousEngagements": ["string"],
          "currentEngagementStrength": 0-10,
          "notesOnCollaboration": "string"
      }
  }
};
