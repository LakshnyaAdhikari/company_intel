import type { CompanyResults } from "@/types/api";

export function asText(value: unknown, fallback = "-") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function asList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .filter(Boolean);
}

export function section(result: CompanyResults | null, key: keyof CompanyResults) {
  return result?.[key] ?? {};
}

export function countFilledSections(result: CompanyResults) {
  return Object.values(result).filter((value) => Object.keys(value).length > 0)
    .length;
}

export function industryFrom(result: CompanyResults | null) {
  return asText(section(result, "market").industry, "");
}

export function ceoFrom(result: CompanyResults | null) {
  return asText(section(result, "leadership").ceo, "");
}

export function regionsFrom(result: CompanyResults | null) {
  return asList(section(result, "market").regions);
}

export function competitorsFrom(result: CompanyResults | null) {
  return asList(section(result, "market").competitors);
}

export function servicesFrom(result: CompanyResults | null) {
  const services = section(result, "services");

  return [
    ...asList(services.core_products),
    ...asList(services.services),
    ...asList(services.business_solutions)
  ];
}

export function technologiesFrom(result: CompanyResults | null) {
  const technology = section(result, "technology");

  return [
    ...asList(technology.frameworks),
    ...asList(technology.cloud_platforms),
    ...asList(technology.apis),
    ...asList(technology.integrations),
    ...asList(technology.developer_tools)
  ];
}
