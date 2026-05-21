/** Shared production options for leather goods inquiries. */

export const PRINTING_TYPE_OPTIONS = [
  "Embossing / debossing",
  "Foil stamping",
  "Metal logo plate",
  "Heat transfer logo",
  "Woven / printed label",
] as const;

/** Material thickness targets. Values stored without suffix for easy parsing. */
export const FABRIC_GSM_OPTIONS = [
  "0.8",
  "1.0",
  "1.2",
  "1.4",
  "1.6",
  "1.8",
  "2.0",
] as const;

export const EMBROIDERY_TYPE_OPTIONS = [
  "Edge stitch finish",
  "Contrast thread stitch",
  "Decorative panel stitching",
  "Quilted stitch pattern",
  "Reinforced stress-point stitching",
] as const;

export function buildStandardOptionSelections(): Record<string, string | boolean> {
  return {
    embroidery: false,
    embroideryType: EMBROIDERY_TYPE_OPTIONS[0],
    fabricGsm: "1.2",
    printing: false,
    printingType: PRINTING_TYPE_OPTIONS[0],
    neckLabels: false,
    customTags: false,
    customBags: false,
    sampleFirst: false,
  };
}
