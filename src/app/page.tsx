"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Lock,
  CheckCircle2,
  Printer,
  Sparkles,
  KeyRound,
} from "lucide-react";

const POLAR_CHECKOUT_URL =
  "https://buy.polar.sh/polar_cl_6RgGm5Fo4kqGOFSUxGsBrr4NxIJhx0px0EbhQ0dSDuv";
const POLAR_ORG_ID = "3851acd2-8bdb-481e-a441-00c674baad5a";

export default function SovraPactPage() {
  const [providerName, setProviderName] = useState("Alex Rivera Studio");
  const [providerEmail, setProviderEmail] = useState("alex@riverastudio.com");
  const [clientName, setClientName] = useState("Acme Corp");
  const [projectTitle, setProjectTitle] = useState("Website Redesign & Webflow Build");
  const [effectiveDate, setEffectiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deliverables, setDeliverables] = useState(
    "1. UI/UX Wireframes & High-Fidelity Figma Designs (up to 5 pages)\n2. Responsive Frontend Development & CMS Setup\n3. Basic On-Page SEO & Speed Optimization"
  );
  const [timeline, setTimeline] = useState("4 Weeks from Effective Date");
  const [totalFee, setTotalFee] = useState("4,500");
  const [paymentTerms, setPaymentTerms] = useState(
    "50% upfront deposit ($2,250), 50% upon final delivery prior to launch."
  );

  const [includedRevisions, setIncludedRevisions] = useState("2");
  const [extraRevisionRate, setExtraRevisionRate] = useState("150");
  const [ipTransferRule, setIpTransferRule] = useState(
    "Full Intellectual Property (IP) rights transfer to Client ONLY upon receipt of final full payment. Service Provider retains rights to display work in portfolios."
  );
  const [killFeePercent, setKillFeePercent] = useState("25");

  const [isPro, setIsPro] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const savedKey = localStorage.getItem("sovrapact_pro_key");
    if (savedKey) {
      setLicenseKey(savedKey);
      setIsPro(true);
    }
  }, []);

  const handleVerifyLicense = async () => {
    const trimmedKey = licenseKey.trim();
    if (!trimmedKey) {
      setErrorMsg("Please enter your SOVR-XXXX license key.");
      return;
    }

    if (!trimmedKey.toUpperCase().startsWith("SOVR-")) {
      setErrorMsg("Invalid key prefix. SovraPact keys start with SOVR-.");
      return;
    }

    setVerifying(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://api.polar.sh/v1/customer-portal/license-keys/validate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: trimmedKey,
            organization_id: POLAR_ORG_ID,
          }),
        }
      );

      const data = await res.json();
      if (res.ok && data.status === "granted") {
        setIsPro(true);
        localStorage.setItem("sovrapact_pro_key", trimmedKey);
        setErrorMsg("");
      } else {
        setErrorMsg("Invalid, revoked, or inactive license key.");
      }
    } catch {
      setErrorMsg("Network error while validating key. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight">SovraPact</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
              SOW & Agreement Generator
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isPro ? (
              <a
                href={POLAR_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
              >
                <Sparkles className="w-4 h-4" />
                Unlock Pro Clauses ($24 One-Time)
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                Pro Unlocked
              </span>
            )}

            <button
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Save as PDF
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 print:p-0 print:block">
        <section className="lg:col-span-5 space-y-6 print:hidden">
          {!isPro && (
            <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  Already bought Pro? Activate Key
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="SOVR-XXXX-XXXX-XXXX"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleVerifyLicense}
                  disabled={verifying}
                  className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  {verifying ? "..." : "Activate"}
                </button>
              </div>
              {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}
            </div>
          )}

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold text-base text-slate-800 border-b pb-2">
              1. Core Project Details (Free)
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Your Name / Studio
                </label>
                <input
                  type="text"
                  value={providerName}
                  onChange={(e) => setProviderName(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={providerEmail}
                  onChange={(e) => setProviderEmail(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Client Name / Company
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Effective Date
                </label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Deliverables & Scope
              </label>
              <textarea
                rows={4}
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Estimated Timeline
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Total Project Fee (USD)
                </label>
                <input
                  type="text"
                  value={totalFee}
                  onChange={(e) => setTotalFee(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Payment Schedule
              </label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 relative">
            <div className="flex items-center justify-between border-b pb-2">
              <h2 className="font-bold text-base text-slate-800 flex items-center gap-1.5">
                2. Legal Protection & Signatures
              </h2>
              {!isPro && (
                <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Pro Only
                </span>
              )}
            </div>

            <div
              className={
                !isPro
                  ? "opacity-50 pointer-events-none select-none space-y-4"
                  : "space-y-4"
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Included Revision Rounds
                  </label>
                  <input
                    type="number"
                    value={includedRevisions}
                    onChange={(e) => setIncludedRevisions(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Extra Revision Rate ($/hr)
                  </label>
                  <input
                    type="text"
                    value={extraRevisionRate}
                    onChange={(e) => setExtraRevisionRate(e.target.value)}
                    className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Cancellation / Kill Fee (%)
                </label>
                <input
                  type="text"
                  value={killFeePercent}
                  onChange={(e) => setKillFeePercent(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Intellectual Property (IP) Clause
                </label>
                <textarea
                  rows={3}
                  value={ipTransferRule}
                  onChange={(e) => setIpTransferRule(e.target.value)}
                  className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {!isPro && (
              <div className="pt-2">
                <a
                  href={POLAR_CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-lg transition"
                >
                  <Lock className="w-4 h-4" />
                  Unlock Pro Clauses & Remove Watermark ($24)
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="lg:col-span-7 print:w-full">
          <div className="bg-white border border-slate-200 shadow-md rounded-xl p-10 min-h-[842px] flex flex-col justify-between print:shadow-none print:border-none print:p-0">
            <div className="space-y-6">
              <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
                    Scope of Work & Service Agreement
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Project: <strong className="text-slate-800">{projectTitle}</strong>
                  </p>
                </div>
                <div className="text-right text-xs text-slate-600">
                  <p>
                    <strong>Effective Date:</strong> {effectiveDate}
                  </p>
                  <p>
                    <strong>Status:</strong> Final Proposal
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">
                    Service Provider
                  </p>
                  <p className="font-bold text-slate-900 mt-0.5">{providerName}</p>
                  <p className="text-slate-600 text-xs">{providerEmail}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">Client</p>
                  <p className="font-bold text-slate-900 mt-0.5">{clientName}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  1. Scope of Services & Deliverables
                </h3>
                <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed border-l-2 border-slate-300 pl-3">
                  {deliverables}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    2. Estimated Timeline
                  </h3>
                  <p className="text-slate-700">{timeline}</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    3. Compensation
                  </h3>
                  <p className="text-slate-900 font-bold text-base">
                    ${totalFee} USD
                  </p>
                  <p className="text-xs text-slate-600">{paymentTerms}</p>
                </div>
              </div>

              {isPro ? (
                <div className="space-y-4 pt-2 border-t border-slate-200 text-sm">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                      4. Revisions & Scope Creep Protection
                    </h3>
                    <p className="text-slate-700 mt-1">
                      This fee includes up to{" "}
                      <strong>
                        {includedRevisions} rounds of consolidated revisions
                      </strong>
                      . Any additional revisions or out-of-scope requests will be
                      billed separately at{" "}
                      <strong>${extraRevisionRate}/hour</strong> upon written
                      approval.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                      5. Intellectual Property (IP) Ownership
                    </h3>
                    <p className="text-slate-700 mt-1">{ipTransferRule}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                      6. Termination & Kill Fee
                    </h3>
                    <p className="text-slate-700 mt-1">
                      Either party may terminate this agreement with 7 days written
                      notice. If Client terminates prior to completion, Client agrees
                      to pay for all work completed to date plus a{" "}
                      <strong>{killFeePercent}% kill fee</strong> of the remaining
                      balance.
                    </p>
                  </div>

                  <div className="pt-8 grid grid-cols-2 gap-8">
                    <div className="border-t border-slate-400 pt-2">
                      <p className="text-xs font-bold text-slate-800">
                        Signed by Service Provider
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {providerName} / Date: ______________
                      </p>
                    </div>
                    <div className="border-t border-slate-400 pt-2">
                      <p className="text-xs font-bold text-slate-800">
                        Accepted & Signed by Client
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {clientName} / Date: ______________
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-center space-y-1 print:hidden">
                  <p className="text-xs font-semibold text-slate-700">
                    Pro Protection Clauses Locked (Revisions Limit, IP Transfer, Kill
                    Fee & Signature Blocks)
                  </p>
                  <p className="text-xs text-slate-500">
                    Unlock Pro to include legally structured clauses and remove the
                    footer watermark.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 text-[11px] text-slate-400 flex flex-col gap-1">
              <p>
                Disclaimer: This document is generated for informational purposes and
                does not constitute formal legal advice. Both parties should review
                terms prior to execution.
              </p>
              {!isPro && (
                <p className="font-semibold text-slate-500">
                  Generated with SovraPact — Instant Freelance SOW Generator
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
