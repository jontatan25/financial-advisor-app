import assets from './data.js'
function calculateTotalBalances(assets) {
  let totalEUR = 0
  let totalUSD = 0
  let totalGBP = 0

  // Iterate through assets array
  assets.forEach((asset) => {
    switch (asset.currency) {
      case 'EUR':
        totalEUR += asset.balance
        break
      case 'USD':
        totalUSD += asset.balance
        break
      case 'GBP':
        totalGBP += asset.balance
        break
      // Add more cases for other currencies if needed
    }
  })

  return {
    EUR: totalEUR,
    USD: totalUSD,
    GBP: totalGBP
  }
}

// Test the function
const totalBalances = calculateTotalBalances(assets)
console.log('TOTAL BALANCES')
console.log(totalBalances)

function listAssetTypes(assets) {
  // Ensure assets is an array and not empty
  if (!Array.isArray(assets) || assets.length === 0) {
    console.error('Invalid assets data or empty array');
    return;
  }

  // Create a Set to store unique types
  const uniqueTypes = new Set();

  // Iterate over the assets array
  assets.forEach(asset => {
    if (asset && asset.type) {
      uniqueTypes.add(asset.type); // Add each type to the Set
    }
  });

  // Convert Set to an array and sort it
  const sortedTypes = Array.from(uniqueTypes).sort();

  // Log sorted types to the console
  console.log('Unique Asset Types:');
  sortedTypes.forEach(type => {
    console.log(type);
  });
}

listAssetTypes(assets)

/**
 * Calculate the totals for each entity and asset type from the given assets array.
 *
 * @param {Array} assets - Array of asset objects.
 * @returns {Object} - Totals for each entity and asset type.
 */
export function calculateTotals(assets) {
  // Initialize totals for each entity and type
  const totals = {
    rothschildmartinmaurel: { ETF: 0, F: 0, FI: 0, O: 0, VI: 0 },
    'santander-e': { ETF: 0, F: 0, FI: 0, O: 0, VI: 0 },
    caixabank: { ETF: 0, F: 0, FI: 0, O: 0, VI: 0 }
  };

  // Calculate totals for each entity and type
  assets.forEach((item) => {
    if (totals[item.entity]) {
      totals[item.entity][item.type] += item.balance * item.rate_to_euro;
    }
  });

  return totals;
}

console.log(calculateTotals(assets));

/**
 * Calculates the total sum of 'cost' and compares it to the 'balance' to determine gains or losses.
 * @param {Array} assets - Array of asset objects. Each object should have 'cost' and 'balance' properties.
 * @returns {Object} - An object containing the totalCost, totalBalance, and a message indicating gains or losses.
 */
export function calculateGainsOrLosses(assets) {
  if (!Array.isArray(assets)) {
    throw new Error("The input should be an array of assets");
  }

  const totalCost = assets.reduce((sum, asset) => sum + (asset.cost || 0), 0);
  const totalBalance = assets.reduce((sum, asset) => sum + (asset.balance || 0), 0);
  
  let message;
  const difference = totalBalance - totalCost;
  
  if (difference > 0) {
    message = `You have a gain of ${difference.toLocaleString('en-EN', { style: 'currency', currency: 'EUR' })}`;
  } else if (difference < 0) {
    message = `You have a loss of ${Math.abs(difference).toLocaleString('en-EN', { style: 'currency', currency: 'EUR' })}`;
  } else {
    message = "You have no gains or losses.";
  }

  return {
    totalCost: totalCost.toLocaleString('en-EN', { style: 'currency', currency: 'EUR' }),
    totalBalance: totalBalance.toLocaleString('en-EN', { style: 'currency', currency: 'EUR' }),
    message: message
  };
}
console.log('COST TO BALANCE')
console.log(calculateGainsOrLosses(assets))

/**
 * Calculate total cost, total balance, and percentage change of the portfolio.
 * @param {Array<Object>} assets Array of assets with 'cost' and 'balance' properties.
 */
function calculatePortfolio(assets) {
  let totalCost = 0;
  let totalBalance = 0;

  // Calculate total cost and total balance
  assets.forEach(asset => {
    totalCost += asset.cost || 0; // Add asset cost if defined, otherwise add 0
    totalBalance += asset.balance || 0; // Add asset balance if defined, otherwise add 0
  });

  // Calculate percentage change
  const percentageChange = totalCost !== 0 ? ((totalBalance - totalCost) / totalCost) * 100 : 0;

  // Log results to console
  console.log(`Total Cost: €${totalCost}`);
  console.log(`Total Balance: €${totalBalance}`);
  console.log(`Percentage Change: ${percentageChange.toFixed(2)}%`);
}
calculatePortfolio(assets)