// dataSchema.js
const dataSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    accrued_interest: { type: ["number", "null"] },
    number_of_shares: { type: "number" },
    balance: { type: "number" },
    capital_gain: { type: "number" },
    cost: { type: "number" },
    currency: { type: "string" },
    entity: { type: "string" },
    expiration_date: { type: ["string", "null"] },
    initial_date: { type: ["string", "null"] },
    interest_rate: { type: ["number", "null"] },
    is_nominal: { type: "boolean" },
    isin: { type: "string" },
    market: { type: "string" },
    name: { type: "string" },
    portfolio_id: { type: "string" },
    type: { type: "string" },
    valuation_date: { type: "string" },
    rate_to_euro: { type: "number" },
  },
};

module.exports = dataSchema;
