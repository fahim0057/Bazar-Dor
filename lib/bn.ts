const BN = "০১২৩৪৫৬৭৮৯";
export const toBn = (n: number | string) => String(n).replace(/\d/g, (d) => BN[+d]);
export const fromBn = (s: string) =>
  s.replace(/[০-৯]/g, (d) => String(BN.indexOf(d))).replace(/,/g, "");

// 148 -> ১৪৮ | 1850 -> ১,৮৫০ | 63.5 -> ৬৩.৫০
export const bnNum = (n: number) =>
  toBn(
    n.toLocaleString("en-IN", {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );

export const formatTaka = (n: number) => bnNum(n) + " টাকা";
export const formatPct = (n: number) => toBn(Math.abs(n).toFixed(1)) + "%";