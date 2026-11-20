import { asList } from "@/lib/company-data";

type JsonSectionProps = {
  data: Record<string, unknown>;
};

function ValueView({ value }: { value: unknown }) {
  const list = asList(value);

  if (list.length) {
    return (
      <div className="flex flex-wrap gap-2">
        {list.map((item) => (
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

  if (typeof value === "string") {
    return <span>{value || "-"}</span>;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return <span>{String(value)}</span>;
  }

  if (value && typeof value === "object") {
    return (
      <pre className="max-h-64 overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-100">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }

  return <span className="text-muted-foreground">-</span>;
}

export function JsonSection({ data }: JsonSectionProps) {
  const entries = Object.entries(data);

  if (!entries.length) {
    return (
      <div className="rounded-md border bg-card p-5 text-sm text-muted-foreground">
        No structured data available for this section.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b last:border-b-0">
              <th className="w-56 bg-muted/50 px-4 py-3 text-left align-top font-medium capitalize text-muted-foreground">
                {key.replace(/_/g, " ")}
              </th>
              <td className="px-4 py-3 align-top">
                <ValueView value={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
