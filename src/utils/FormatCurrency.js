const CURRENCY_LOCALES = {
  USD: "en-us",
  XAF: "fr-CM",
};

export function formatCurrency(amount, currency = "USD") {
  const locale = CURRENCY_LOCALES[currency] || "en-us";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}
