export interface PriceQuery {
  card: string;
  country: string;
  bank: string;
  sku: string;
  installments: string;
}

export interface AdditionalPrice {
  cft: number;
  number_of_installments: number;
  one_installment_centAmount: number;
  tea: number;
  tna: number;
  total_financed_centAmount: number;
  total_interest_centAmount: number;
}
