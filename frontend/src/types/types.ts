export interface User {
  id: number;
  fullName: string;
  email: string;
  photoUrl: string;
}

export interface Asset {
  id: string
  accrued_interest: number | null
  number_of_shares: number
  balance: number
  capital_gain: number
  cost: number
  currency: string
  entity: string
  expiration_date: string | null
  initial_date: string | null
  interest_rate: number | null
  is_nominal: boolean
  isin: string
  market: string
  name: string
  portfolio_id: string
  type: string
  valuation_date: string
  rate_to_euro: number
}

export interface TypeCount {
  [key: string]: number
}

export interface TypeMapping {
  [key: string]: string
}
