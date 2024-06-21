const fastify = require("fastify")({ logger: true });
const fs = require("fs");
const csvParser = require("csv-parser");

// Enable CORS
fastify.register(require("@fastify/cors"), {
  origin: "*",
});

// Schema for serialization
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

// Function to parse and convert CSV data
const parseAndConvertCSVData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("./positionDataset.csv")
      .pipe(csvParser())
      .on("data", (data) => {
        results.push({
          id: data.id,
          accrued_interest: data.accrued_interest
            ? parseFloat(data.accrued_interest)
            : null,
          number_of_shares: data.number_of_shares
            ? parseFloat(data.number_of_shares)
            : null,
          balance: data.balance ? parseFloat(data.balance) : null,
          capital_gain: data.capital_gain
            ? parseFloat(data.capital_gain)
            : null,
          cost: data.cost ? parseFloat(data.cost) : null,
          currency: data.currency,
          entity: data.entity,
          expiration_date: data.expiration_date || null,
          initial_date: data.initial_date || null,
          interest_rate: data["interest.rate"]
            ? parseFloat(data["interest.rate"])
            : null,
          is_nominal: data.is_nominal === "True",
          isin: data.isin,
          market: data.market,
          name: data.name,
          portfolio_id: data.portfolio_id,
          type: data.type,
          valuation_date: data.valuation_date,
          rate_to_euro: data.rate_to_euro
            ? parseFloat(data.rate_to_euro)
            : null,
        });
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

// Endpoint to serve CSV data as JSON
fastify.get("/api/data", async (request, reply) => {
  try {
    const data = await parseAndConvertCSVData();
    const serialize = reply.compileSerializationSchema({
      type: "array",
      items: dataSchema,
    });
    reply.send(serialize(data));
  } catch (err) {
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server listening on http://0.0.0.0:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
