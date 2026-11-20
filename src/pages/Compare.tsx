import { useEffect, useMemo, useState } from "react";

import {
  asList,
  asText,
  competitorsFrom,
  regionsFrom,
  servicesFrom,
  technologiesFrom
} from "@/lib/company-data";
import { getCompanies, getCompanyResults } from "@/services/api";
import type { CompanyResults, CompanySummary } from "@/types/api";

const dimensions = [
  "Leadership",
  "Services",
  "Regions",
  "Competitors",
  "Technology",
  "Business Models"
] as const;

export function Compare() {
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<Record<string, CompanyResults>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    getCompanies()
      .then((data) => {
        setCompanies(data);
        setSelected(data.slice(0, 3).map((company) => company.company));
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load companies");
      });
  }, []);

  useEffect(() => {
    selected.forEach((company) => {
      if (results[company]) {
        return;
      }

      getCompanyResults(company)
        .then((result) => {
          setResults((current) => ({ ...current, [company]: result }));
        })
        .catch((err: unknown) => {
          setError(
            err instanceof Error
              ? err.message
              : `Unable to load ${company} profile`
          );
        });
    });
  }, [results, selected]);

  const selectedCompanies = useMemo(
    () => companies.filter((company) => selected.includes(company.company)),
    [companies, selected]
  );

  function toggleCompany(company: string) {
    setSelected((current) =>
      current.includes(company)
        ? current.filter((item) => item !== company)
        : [...current, company]
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Compare</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Compare leadership, services, regions, competitors, technology, and
          business models across companies.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <section className="rounded-md border bg-card p-5">
        <h2 className="text-base font-semibold">Select Companies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {companies.length ? (
            companies.map((company) => (
              <label
                key={company.company}
                className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm"
              >
                <input
                  checked={selected.includes(company.company)}
                  onChange={() => toggleCompany(company.company)}
                  type="checkbox"
                />
                {company.company}
              </label>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No stored companies available.
            </p>
          )}
        </div>
      </section>

      <section className="overflow-x-auto rounded-md border bg-card">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-48 px-4 py-3 text-left font-medium text-muted-foreground">
                Dimension
              </th>
              {selectedCompanies.map((company) => (
                <th
                  key={company.company}
                  className="px-4 py-3 text-left font-medium capitalize text-muted-foreground"
                >
                  {company.company}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dimensions.map((dimension) => (
              <tr key={dimension} className="border-t">
                <th className="bg-muted/30 px-4 py-3 text-left align-top font-medium">
                  {dimension}
                </th>
                {selectedCompanies.map((company) => (
                  <td key={company.company} className="px-4 py-3 align-top">
                    <CompareValue
                      dimension={dimension}
                      result={results[company.company]}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function CompareValue({
  dimension,
  result
}: {
  dimension: (typeof dimensions)[number];
  result?: CompanyResults;
}) {
  if (!result) {
    return <span className="text-muted-foreground">Loading...</span>;
  }

  const leadership = result.leadership;
  const market = result.market;

  if (dimension === "Leadership") {
    return (
      <div>
        <p>CEO: {asText(leadership.ceo)}</p>
        <p className="text-muted-foreground">
          Founders: {asList(leadership.founders).join(", ") || "-"}
        </p>
      </div>
    );
  }

  if (dimension === "Services") {
    return <TagList items={servicesFrom(result)} />;
  }

  if (dimension === "Regions") {
    return <TagList items={regionsFrom(result)} />;
  }

  if (dimension === "Competitors") {
    return <TagList items={competitorsFrom(result)} />;
  }

  if (dimension === "Technology") {
    return <TagList items={technologiesFrom(result)} />;
  }

  return <span>{asText(market.business_model)}</span>;
}

function TagList({ items }: { items: string[] }) {
  if (!items.length) {
    return <span className="text-muted-foreground">-</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, 12).map((item) => (
        <span
          key={item}
          className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
