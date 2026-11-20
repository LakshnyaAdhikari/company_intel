import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { JsonSection } from "@/components/JsonSection";
import { Button } from "@/components/ui/button";
import {
  asList,
  asText,
  countFilledSections,
  industryFrom,
  section
} from "@/lib/company-data";
import { getCompanyResults } from "@/services/api";
import type { CompanyResults } from "@/types/api";

const tabs = [
  "Overview",
  "Leadership",
  "Services",
  "Legal",
  "Technology",
  "Market",
  "Contact",
  "Sources",
  "Raw JSON"
] as const;

type TabName = (typeof tabs)[number];

export function CompanyProfile() {
  const { id } = useParams();
  const [result, setResult] = useState<CompanyResults | null>(null);
  const [activeTab, setActiveTab] = useState<TabName>("Overview");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    getCompanyResults(id)
      .then(setResult)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load profile");
      });
  }, [id]);

  const leadership = section(result, "leadership");
  const services = section(result, "services");
  const legal = section(result, "legal");
  const technology = section(result, "technology");
  const market = section(result, "market");
  const contact = section(result, "contact");

  const summary = useMemo(() => {
    if (!result) {
      return [];
    }

    return [
      ["CEO", asText(leadership.ceo)],
      ["Headquarters", asText(leadership.headquarters || contact.headquarters)],
      ["Industry", industryFrom(result) || "-"],
      ["Coverage", `${countFilledSections(result)} / 6 sections`]
    ];
  }, [contact.headquarters, leadership.ceo, leadership.headquarters, result]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold capitalize">
            {id ?? "Company"} Profile
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {industryFrom(result) || "Structured company intelligence profile."}
          </p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link to="/companies">Back to Companies</Link>
        </Button>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!result && !error ? (
        <div className="rounded-md border bg-card p-5 text-sm text-muted-foreground">
          Loading profile...
        </div>
      ) : null}

      {result ? (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            {summary.map(([label, value]) => (
              <section key={label} className="rounded-md border bg-card p-4">
                <p className="text-xs font-medium uppercase text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 text-sm font-semibold">{value}</p>
              </section>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 border-b pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <TabPanel
            activeTab={activeTab}
            contact={contact}
            leadership={leadership}
            legal={legal}
            market={market}
            result={result}
            services={services}
            technology={technology}
          />
        </>
      ) : null}
    </div>
  );
}

type TabPanelProps = {
  activeTab: TabName;
  leadership: Record<string, unknown>;
  services: Record<string, unknown>;
  legal: Record<string, unknown>;
  technology: Record<string, unknown>;
  market: Record<string, unknown>;
  contact: Record<string, unknown>;
  result: CompanyResults;
};

function TabPanel({
  activeTab,
  contact,
  leadership,
  legal,
  market,
  result,
  services,
  technology
}: TabPanelProps) {
  if (activeTab === "Overview") {
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <OverviewCard
          title="Leadership"
          items={[
            ["CEO", asText(leadership.ceo)],
            ["Founders", asList(leadership.founders).join(", ") || "-"]
          ]}
        />
        <OverviewCard
          title="Market"
          items={[
            ["Industry", asText(market.industry)],
            ["Regions", asList(market.regions).join(", ") || "-"]
          ]}
        />
        <OverviewCard
          title="Technology"
          items={[
            ["APIs", asList(technology.apis).join(", ") || "-"],
            ["Tools", asList(technology.developer_tools).join(", ") || "-"]
          ]}
        />
        <OverviewCard
          title="Contact"
          items={[
            ["Headquarters", asText(contact.headquarters)],
            ["Emails", asList(contact.emails).join(", ") || "-"]
          ]}
        />
      </div>
    );
  }

  if (activeTab === "Leadership") return <JsonSection data={leadership} />;
  if (activeTab === "Services") return <JsonSection data={services} />;
  if (activeTab === "Legal") return <JsonSection data={legal} />;
  if (activeTab === "Technology") return <JsonSection data={technology} />;
  if (activeTab === "Market") return <JsonSection data={market} />;
  if (activeTab === "Contact") return <JsonSection data={contact} />;

  if (activeTab === "Sources") {
    return (
      <section className="rounded-md border bg-card p-5 text-sm text-muted-foreground">
        Source-page metadata is not stored yet. The backend currently saves final
        structured analysis only.
      </section>
    );
  }

  return (
    <pre className="max-h-[620px] overflow-auto rounded-md bg-slate-950 p-4 text-xs text-slate-100">
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}

function OverviewCard({
  items,
  title
}: {
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <section className="rounded-md border bg-card p-5">
      <h2 className="text-base font-semibold">{title}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="font-medium text-muted-foreground">{label}</dt>
            <dd className="mt-1">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
