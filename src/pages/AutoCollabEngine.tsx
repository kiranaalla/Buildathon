// src/pages/AutoCollabEngine.tsx
import { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/**
 * Final, production-ready AutoCollabEngine component
 * - Tailwind-based UI
 * - Recharts charts (acceptance timeline, estimated reach pie, ROI trend)
 * - Real-time acceptance simulation (demo) with robust timer management
 * - Exact lock-on-needed behavior (stops timers the moment required accepts are reached)
 * - Reject button for each final influencer (promotes next candidate from pool)
 *
 * NOTE: Replace simulated parts with server-driven WebSocket events in production.
 */

type Influencer = {
  id: number;
  name: string;
  niche: string;
  followers: number;
  engagement: number; // percent
  authenticity: number; // percent
  status: "pending" | "accepted" | "rejected";
};

const CAMPAIGN_PREVIEW = "/mnt/data/29de4195-bdb9-4016-bf79-dcc53dc68954.png";

const NICHE_MULTIPLIERS: Record<string, number> = {
  Food: 1.2,
  Travel: 1.3,
  Fashion: 1.4,
  Fitness: 1.1,
  Beauty: 1.3,
};

const makeMockInfluencers = (count = 20): Influencer[] =>
  Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name:
      [
        "Aditi Rao",
        "Rohit Cinematics",
        "FitWithKavya",
        "Priya Eats",
        "StreetBites",
        "UrbanBites",
        "CafeCrush",
        "LocalGrub",
      ][i % 8] + ` ${i + 1}`,
    niche: "Food",
    followers: Math.round(30_000 + Math.random() * 170_000),
    engagement: +(2 + Math.random() * 6).toFixed(1),
    authenticity: Math.round(60 + Math.random() * 40),
    status: "pending",
  }));

export default function AutoCollabEngine() {
  const [inputText, setInputText] = useState("");
  const [step, setStep] = useState<number>(1);
  const [aiBrief, setAiBrief] = useState<any>(null);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [influencers, setInfluencers] = useState<Influencer[]>(
    makeMockInfluencers()
  );
  const [needed, setNeeded] = useState<number>(5);
  const [acceptedCount, setAcceptedCount] = useState<number>(0);
  const [campaignLocked, setCampaignLocked] = useState<boolean>(false);
  // const [dispatching, setDispatching] = useState(false); // Unused

  // timers ref so we can clear precisely when needed
  const timersRef = useRef<number[]>([]);
  // a flag to indicate simulation should stop
  const stopSimRef = useRef(false);

  // Helper: calculate reach potential
  const calculateReach = (inf: Influencer) => {
    const m = NICHE_MULTIPLIERS[inf.niche] ?? 1;
    return Math.round(inf.followers * (inf.engagement / 100) * (inf.authenticity / 100) * m);
  };

  // derived lists
  const acceptedPool = influencers.filter((i) => i.status === "accepted");
  // topSelected = accepted sorted by reach potential and capped to needed
  const topSelected = acceptedPool
    .slice()
    .sort((a, b) => calculateReach(b) - calculateReach(a))
    .slice(0, needed);
  // waiting list = accepted pool excluding topSelected
  const waitingList = acceptedPool.filter((a) => !topSelected.find((s) => s.id === a.id));

  // safety cap shown in UI
  const safeAcceptedCount = Math.min(acceptedCount, needed);

  // ensure acceptedCount & locked state are consistent
  useEffect(() => {
    setAcceptedCount(acceptedPool.length);
    if (acceptedPool.length >= needed) {
      setCampaignLocked(true);
    } else {
      setCampaignLocked(false);
    }
  }, [acceptedPool.length, needed]);

  // when campaignLocked flips to true, transition to Summary (Step 6) after a short settle
  useEffect(() => {
    if (campaignLocked) {
      // stop simulation immediately and clear timers
      stopSimulation();
      // give DOM a moment to settle then move to summary
      const t = window.setTimeout(() => setStep(6), 300);
      return () => clearTimeout(t);
    }
  }, [campaignLocked]);

  // clear timers helper
  function clearAllTimers() {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }

  function stopSimulation() {
    stopSimRef.current = true;
    clearAllTimers();
  }

  // AI generation (demo)
  const generateAI = () => {
    if (!inputText.trim()) return;
    setStep(2);
    setAiBrief(null);
    setTimeout(() => {
      setAiBrief({
        niche: "Food",
        objective: "Increase same-day footfall",
        deliverables: "1 Reel + 1 Story",
        timeline: "24-48 hours",
        captions: [
          "Huge 50% off on all pizzas today! Hurry to grab a slice 🍕",
          "Biryani lovers — 50% off for today only!",
        ],
        hashtags: ["#foodie", "#discount", "#local"],
      });
      setStep(3);
      const low = Math.round(1500 + Math.random() * 1000);
      const high = Math.round(low + 1200 + Math.random() * 1800);
      setPriceRange([low, high]);
    }, 800);
  };

  // Dispatch: reset and start simulation
  const dispatchToInfluencers = () => {
    setStep(4);
    // setDispatching(true); // Removed unused state
    stopSimRef.current = false;
    clearAllTimers();
    // assign a fresh mock pool for the dispatch (demo)
    const pool = makeMockInfluencers(20);
    setInfluencers(pool.map((p) => ({ ...p, status: "pending" as Influencer["status"] })));
    setTimeout(() => {
      // setDispatching(false); // Removed unused state
      setStep(5);
      simulateAcceptances(pool);
    }, 900);
  };

  // CORE: simulate acceptances but STOP when needed accepts are reached
  function simulateAcceptances(pool?: Influencer[]) {
    // ensure any previous simulation stopped
    stopSimRef.current = false;
    clearAllTimers();
    timersRef.current = [];

    const source = pool ?? makeMockInfluencers(20);
    // initialize pool with pending
    setInfluencers(source.map((p) => ({ ...p, status: "pending" as Influencer["status"] })));
    setAcceptedCount(0);

    // use local timers array for this run
    const localTimers: number[] = [];

    for (let i = 0; i < source.length; i++) {
      if (stopSimRef.current) break;
      const inf = source[i];
      // simple heuristic probability
      const probability = Math.min(0.95, (inf.authenticity / 150) + (inf.engagement / 10));
      const delay = 800 + Math.random() * 7000 + i * 120;

      const t = window.setTimeout(() => {
        if (stopSimRef.current) return;

        setInfluencers((prev) => {
          // if campaign already locked by another timer, do nothing
          const acceptedNow = prev.filter((x) => x.status === "accepted").length;
          if (acceptedNow >= needed) {
            // ensure final lock
            stopSimRef.current = true;
            clearAllTimers();
            return prev;
          }

          const copy = [...prev];
          const idx = copy.findIndex((x) => x.id === inf.id);
          if (idx === -1) return copy;
          const willAccept = Math.random() < probability;
          copy[idx] = { ...copy[idx], status: willAccept ? "accepted" as Influencer["status"] : "rejected" as Influencer["status"] };

          const acceptedCountNow = copy.filter((x) => x.status === "accepted").length;
          if (acceptedCountNow >= needed) {
            // lock and stop further timers immediately
            stopSimRef.current = true;
            clearAllTimers();
            setCampaignLocked(true);
          }
          return copy;
        });
      }, delay);

      localTimers.push(t);
      timersRef.current.push(t);
    }

    // safety: stop simulation after 20s if not locked
    const stopT = window.setTimeout(() => {
      stopSimRef.current = true;
      clearAllTimers();
    }, 20000);
    timersRef.current.push(stopT);
  }

  // Reject a selected influencer (Option D footer button):
  // - mark rejected
  // - try to promote the best available pending/rejected candidate to accepted to keep count == needed
  const rejectSelected = (id: number) => {
    stopSimRef.current = true; // pause simulation momentarily to avoid race
    clearAllTimers();

    setInfluencers((prev) => {
      const copy = prev.map((p) => (p.id === id ? { ...p, status: "rejected" as Influencer["status"] } : p));
      // count accepted now
      const acceptedNow = copy.filter((x) => x.status === "accepted").length;
      if (acceptedNow >= needed) {
        // already enough, nothing else to promote
        return copy;
      }
      // pick best candidate from the rest: prefer pending first, then rejected (by reach potential)
      const candidates = copy
        .filter((x) => x.status !== "accepted")
        .sort((a, b) => calculateReach(b) - calculateReach(a));
      if (candidates.length > 0) {
        const pick = candidates[0];
        const idx = copy.findIndex((x) => x.id === pick.id);
        if (idx >= 0) copy[idx] = { ...copy[idx], status: "accepted" as Influencer["status"] };
      }
      return copy;
    });

    // resume simulation if needed
    stopSimRef.current = false;
    // continue accepting from remaining pending (demo)
    simulateAcceptances(influencers);
  };

  // approve and start campaign (demo)
  const approveAndStart = () => {
    // In prod: create escrow, persist campaign, trigger auto-post scheduling, notify influencers
    alert("Campaign approved — escrow created and campaigns scheduled (demo).");
    // reset demo state
    stopSimulation();
    setStep(1);
    setInputText("");
    setAiBrief(null);
    setPriceRange(null);
    setInfluencers(makeMockInfluencers());
    setAcceptedCount(0);
    setCampaignLocked(false);
    stopSimRef.current = false;
  };

  // Charts data
  const acceptanceTimelineData = influencers.map((inf, idx) => ({
    time: idx + 1,
    accepted: inf.status === "accepted" ? 1 : 0,
  }));
  const reachData = topSelected.map((i) => ({ name: i.name, value: calculateReach(i) }));
  const roiData = topSelected.map((i, idx) => ({ step: idx + 1, roi: Math.round((i.engagement * i.authenticity) / 1.5) }));

  // average / cost placeholders
  const avgEstimatedCost = priceRange ? Math.round((priceRange[0] + priceRange[1]) / 2) : null;
  const estCostPerInfluencer = avgEstimatedCost && needed ? Math.round(avgEstimatedCost / needed) : "—";

  // cleanup on unmount
  useEffect(() => {
    return () => {
      stopSimulation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Auto-Collab Engine — Smart Campaign Builder</h1>
          <p className="text-gray-600">Type or speak your promotion. AI will build, price, and dispatch to local creators.</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">Needed influencers</div>
          <select
            className="rounded-lg p-2 border"
            value={needed}
            onChange={(e) => setNeeded(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div
            key={s}
            className={`flex-1 py-2 text-center rounded-lg ${step === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            {s === 1 && "Input"}
            {s === 2 && "AI Brief"}
            {s === 3 && "Pricing"}
            {s === 4 && "Dispatch"}
            {s === 5 && "Acceptance"}
            {s === 6 && "Summary"}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div>
        {/* Step 1 - Input */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-4">
              <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
              </svg>
              <input
                className="flex-1 bg-gray-50 border rounded-lg p-3 outline-none"
                placeholder="Describe your promotion or offer (e.g. 50% off on pizzas today)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button onClick={generateAI} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Create Campaign with AI</button>
              <button className="border py-2 px-4 rounded-lg">Record Voice (coming)</button>
              <button className="text-gray-600 py-2 px-4">Use Saved Template</button>
            </div>

            <p className="mt-3 text-sm text-gray-500">Tip: Be specific about discounts, dates, or special instructions. AI uses your business profile for niche & audience data.</p>
          </div>
        )}

        {/* Step 2 - AI brief */}
        {step === 2 && aiBrief && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">AI-Generated Campaign Blueprint</h2>
                <p className="text-sm text-gray-500 mt-2">Auto-detected niche: <span className="font-medium">{aiBrief.niche}</span></p>
              </div>
              <div>
                <button onClick={() => setStep(1)} className="border py-2 px-3 rounded-lg">Edit Input</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-semibold">Objective</h3>
                <p className="text-gray-700">{aiBrief.objective}</p>

                <h3 className="font-semibold mt-3">Deliverables</h3>
                <p className="text-gray-700">{aiBrief.deliverables}</p>

                <h3 className="font-semibold mt-3">Timeline</h3>
                <p className="text-gray-700">{aiBrief.timeline}</p>
              </div>

              <div>
                <h3 className="font-semibold">Captions</h3>
                <ul className="list-disc ml-5 mt-2 text-gray-700">
                  {aiBrief.captions.map((c: string, idx: number) => <li key={idx}>{c}</li>)}
                </ul>

                <h3 className="font-semibold mt-3">Hashtags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {aiBrief.hashtags.map((h: string, idx: number) => <span key={idx} className="text-sm bg-gray-100 px-3 py-1 rounded-full">{h}</span>)}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={() => setStep(1)} className="border py-2 px-4 rounded-lg">Back</button>
              <button onClick={() => setStep(3)} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Continue to Pricing</button>
            </div>
          </div>
        )}

        {/* Step 3 - Pricing */}
        {step === 3 && priceRange && (
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">AI-Generated Pricing & Performance Estimate</h2>
                <p className="text-sm text-gray-500 mt-2">Price is calculated from market trends, urgency, and influencer supply.</p>
              </div>
              <div>
                <button onClick={() => setStep(2)} className="border py-2 px-3 rounded-lg">Edit Brief</button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Estimated Cost <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">?</span></p>
                <p className="text-2xl font-bold">₹{priceRange[0]} - ₹{priceRange[1]}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Expected Reach <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">?</span></p>
                <p className="text-2xl font-bold">~{Math.round(priceRange[1] * 8)} impressions</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Urgency Premium <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">?</span></p>
                <p className="text-2xl font-bold">{Math.round(10 + Math.random() * 20)}%</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-3">
              <button onClick={() => setStep(2)} className="border py-2 px-4 rounded-lg">Back</button>
              <button onClick={dispatchToInfluencers} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Send to Influencers</button>
            </div>
          </div>
        )}

        {/* Step 4 - Dispatch */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold">Sending Campaign to Verified Influencers</h2>
            <p className="text-sm text-gray-500 mt-2">Filtering & prioritizing top local creators based on authenticity, engagement and reach.</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Invites Sent</p>
                <p className="text-3xl font-bold">20</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Top Priority</p>
                <p className="text-3xl font-bold">Based on authenticity & reach</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-blue-600 rounded-full w-3/4 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5 - Acceptance */}
        {step === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Real-Time Influencer Acceptance</h2>
                  <p className="text-sm text-gray-500">Waiting for {needed} influencers to accept. Real-time updates below.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Accepted <span className="font-semibold">{safeAcceptedCount}</span> / {needed}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {influencers.slice(0, 10).map((inf) => (
                  <div key={inf.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-full" />
                      <div>
                        <div className="font-semibold">{inf.name}</div>
                        <div className="text-xs text-gray-500">{Math.round(inf.followers / 1000)}k • ER {inf.engagement}%</div>
                        <div className="text-xs text-gray-400">Auth {inf.authenticity}%</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {inf.status === "pending" && <div className="text-sm text-gray-500">Pending</div>}
                      {inf.status === "accepted" && <div className="text-sm text-green-600 font-semibold">Accepted</div>}
                      {inf.status === "rejected" && <div className="text-sm text-red-500">Rejected</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Acceptance Timeline Chart */}
              <div className="mt-4 p-4 bg-white rounded-xl shadow">
                <h3 className="font-semibold mb-3">Acceptance Timeline</h3>
                <div style={{ width: "100%", height: 200 }}>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={acceptanceTimelineData}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <RTooltip />
                      <Line type="monotone" dataKey="accepted" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Live updates continue for demo. In production this is websocket-driven.</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      stopSimulation();
                      setInfluencers(makeMockInfluencers());
                      setAcceptedCount(0);
                      setCampaignLocked(false);
                      setStep(1);
                    }}
                    className="border py-2 px-3 rounded-lg"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      // Force lock for demo
                      stopSimulation();
                      setCampaignLocked(true);
                    }}
                    className="bg-gray-800 text-white py-2 px-3 rounded-lg"
                  >
                    Force Lock (demo)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-4">
              <h3 className="font-semibold">Dispatch Summary</h3>
              <div className="mt-3 text-sm text-gray-600">
                <p>Invites sent: 20</p>
                <p>Top pool: 100 local creators</p>
                <p>Auto-priority: authenticity & engagement</p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium">Estimated cost per accepted influencer</h4>
                <p className="text-2xl font-bold mt-2">₹{estCostPerInfluencer}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 6 - Summary */}
        {step === 6 && (
          <div className="bg-white rounded-2xl shadow p-6">
            {/* Reach Pie */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow">
              <h3 className="font-semibold mb-3">Estimated Reach Contribution (Before Campaign Starts)</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={reachData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                      {reachData.map((_, idx) => (
                        <Cell key={`cell-${idx}`} fill={["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"][idx % 5]} />
                      ))}
                    </Pie>
                    <RTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ROI Trend */}
            <div className="mb-6 p-4 bg-white rounded-xl shadow">
              <h3 className="font-semibold mb-3">Projected ROI Trend</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={roiData}>
                    <XAxis dataKey="step" />
                    <YAxis />
                    <RTooltip />
                    <Line type="monotone" dataKey="roi" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <h2 className="text-xl font-semibold">Campaign Ready — Review & Approve</h2>
            <p className="text-sm text-gray-500 mt-2">Your campaign will run as configured. Review cost and approve to create escrow.</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="text-2xl font-bold">₹{avgEstimatedCost ?? "—"}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Total Estimated Reach</p>
                <p className="text-2xl font-bold">~{avgEstimatedCost ? Math.round((avgEstimatedCost as number) * 8) : "—"}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Estimated ROI</p>
                <p className="text-2xl font-bold text-green-600">{Math.round(60 + Math.random() * 25)}%</p>
              </div>
            </div>

            {/* Final selected influencers (only top 'needed') */}
            <div className="mt-4">
              <h4 className="font-medium">Final Selected Influencers ({topSelected.length})</h4>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                {topSelected.map((inf) => (
                  <div key={inf.id} className="p-3 bg-white rounded-lg shadow flex flex-col justify-between">
                    <div>
                      <div className="font-semibold">{inf.name}</div>
                      <div className="text-xs text-gray-500">{Math.round(inf.followers / 1000)}k • ER {inf.engagement}%</div>
                      <div className="text-xs text-gray-400">Auth {inf.authenticity}%</div>
                    </div>

                    {/* Reject button (Option D: card footer button) */}
                    <div className="mt-3">
                      <button
                        onClick={() => rejectSelected(inf.id)}
                        className="w-full bg-red-600 text-white py-2 rounded-lg"
                      >
                        Reject Influencer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waiting list */}
            <div className="mt-6">
              <h4 className="font-medium">Waiting List</h4>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {waitingList.length === 0 && <div className="text-sm text-gray-500">No waiting influencers yet.</div>}
                {waitingList.map((inf) => (
                  <div key={inf.id} className="p-3 bg-white rounded-lg shadow flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{inf.name}</div>
                      <div className="text-xs text-gray-500">{Math.round(inf.followers / 1000)}k • ER {inf.engagement}%</div>
                    </div>
                    <div className="text-sm text-gray-600">Waiting</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: preview & actions */}
            <div className="mt-6 flex items-start justify-between">
              <div className="text-sm text-gray-500">Download a campaign summary or approve to create escrow and start the campaign.</div>
              <div className="w-60">
                <img src={CAMPAIGN_PREVIEW} alt="campaign" className="rounded-lg object-cover w-full h-40" />
                <div className="mt-4">
                  <button onClick={approveAndStart} className="w-full bg-blue-600 text-white py-3 rounded-lg">Approve & Start Campaign</button>
                  <button className="w-full border py-3 rounded-lg mt-3">Download Summary (PDF)</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
