const BN = "০১২৩৪৫৬৭৮৯";
export const toBn = (n: number | string) => String(n).replace(/\d/g, (d) => BN[+d]);
export const fromBn = (s: string) =>
  s.replace(/[০-৯]/g, (d) => String(BN.indexOf(d))).replace(/,/g, "");

export const formatTaka = (n: number) => toBn(n.toLocaleString("en-IN")) + " টাকা";
export const formatPct = (n: number) => toBn(Math.abs(n).toFixed(1)) + "%";