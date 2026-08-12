"use client";

import { useState, useMemo, type ReactNode } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Client-side utility · no server required
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Data stays in your browser. Part of the Bookchaowalit developer tools portfolio.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";
const areaClass = `${inputClass} min-h-[160px] resize-y`;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMarkdown(src: string): string {
  const escaped = escapeHtml(src);
  const lines = escaped.split("\n");
  const html: string[] = [];
  let inCode = false;
  let inList = false;
  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };
  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        html.push("</code></pre>");
        inCode = false;
      } else {
        closeList();
        html.push('<pre class="overflow-auto rounded bg-zinc-100 p-3 dark:bg-zinc-900"><code>');
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      html.push(line + "\n");
      continue;
    }
    const inline = line
      .replace(/`([^`]+)`/g, '<code class="rounded bg-zinc-100 px-1 dark:bg-zinc-800">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="text-blue-600 underline dark:text-blue-400" href="$2" rel="noreferrer">$1</a>');

    if (/^### /.test(line)) {
      closeList();
      html.push(`<h3 class="mt-4 text-lg font-semibold">${inline.slice(4)}</h3>`);
    } else if (/^## /.test(line)) {
      closeList();
      html.push(`<h2 class="mt-4 text-xl font-semibold">${inline.slice(3)}</h2>`);
    } else if (/^# /.test(line)) {
      closeList();
      html.push(`<h1 class="mt-4 text-2xl font-bold">${inline.slice(2)}</h1>`);
    } else if (/^&gt; /.test(line) || /^> /.test(src.split("\n")[lines.indexOf(line)] || "")) {
      closeList();
      html.push(`<blockquote class="border-l-4 border-zinc-300 pl-3 text-zinc-600 dark:text-zinc-400">${inline.replace(/^(&gt;|&gt;|>)\s?/, "")}</blockquote>`);
    } else if (/^- /.test(line)) {
      if (!inList) {
        html.push('<ul class="list-disc space-y-1 pl-5">');
        inList = true;
      }
      html.push(`<li>${inline.slice(2)}</li>`);
    } else if (!line.trim()) {
      closeList();
      html.push("<br/>");
    } else {
      closeList();
      html.push(`<p class="my-2 leading-relaxed">${inline}</p>`);
    }
  }
  closeList();
  if (inCode) html.push("</code></pre>");
  return html.join("");
}

const SAMPLE = `# Markdown Editor

Write on the left, preview on the right.

## Features
- **Bold** and *italic*
- \`inline code\`
- [Links](https://bookchaowalit.com)

> Notes stay in your browser.

\`\`\`
console.log("hello");
\`\`\`
`;

export default function Home() {
  const [src, setSrc] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => renderMarkdown(src), [src]);

  return (
    <Shell title="Markdown Editor" subtitle="A minimal split-pane editor for notes and README drafts. No account, no save backend.">
      <div className="mb-3 flex gap-2">
        <Button
          variant="secondary"
          onClick={async () => {
            if (await copyText(src)) {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }
          }}
        >
          {copied ? "Copied" : "Copy Markdown"}
        </Button>
        <Button variant="ghost" onClick={() => setSrc(SAMPLE)}>
          Reset sample
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Markdown">
          <textarea className={`${areaClass} min-h-[420px]`} value={src} onChange={(e) => setSrc(e.target.value)} />
        </Field>
        <div>
          <span className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Preview</span>
          <div
            className="min-h-[420px] rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Shell>
  );
}
