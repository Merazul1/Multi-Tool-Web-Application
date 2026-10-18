import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Sparkles, 
  Hourglass, 
  CheckCircle2, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { useToolContext } from '../../context/ToolContext';

interface CustomEvent {
  id: string;
  name: string;
  date: string;
}

export const CountdownCalculatorTool: React.FC = () => {
  const { recordToolAction, setShowBlueprintModal } = useToolContext();
  const [activeTab, setActiveTab] = useState<'until' | 'duration' | 'holidays' | 'custom'>('until');
  const [now, setNow] = useState(new Date());

  // Until Date state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 30);
  const [targetDateStr, setTargetDateStr] = useState<string>(
    tomorrow.toISOString().split('T')[0]
  );

  // Duration State
  const [startDateStr, setStartDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 90);
  const [endDateStr, setEndDateStr] = useState<string>(
    futureDate.toISOString().split('T')[0]
  );

  // Custom Events in LocalStorage
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>(() => {
    try {
      const saved = localStorage.getItem('toolverse_custom_countdowns');
      return saved ? JSON.parse(saved) : [
        { id: '1', name: 'Product V3 Launch', date: '2026-12-15' },
        { id: '2', name: 'Summer Vacation', date: '2027-06-01' }
      ];
    } catch {
      return [
        { id: '1', name: 'Product V3 Launch', date: '2026-12-15' },
        { id: '2', name: 'Summer Vacation', date: '2027-06-01' }
      ];
    }
  });

  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');

  // Clock tick
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('toolverse_custom_countdowns', JSON.stringify(customEvents));
    } catch (e) {
      console.error(e);
    }
  }, [customEvents]);

  // Calculations for Until Date
  const targetDate = new Date(`${targetDateStr}T00:00:00`);
  const diffMs = targetDate.getTime() - now.getTime();
  const isPast = diffMs < 0;
  const absDiffMs = Math.abs(diffMs);

  const totalDays = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = (totalDays / 7).toFixed(1);
  const totalHours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const remainingHours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));
  const remainingSeconds = Math.floor((absDiffMs % (1000 * 60)) / 1000);

  // Calculations for Duration between 2 dates
  const startD = new Date(startDateStr);
  const endD = new Date(endDateStr);
  const durationDiffMs = endD.getTime() - startD.getTime();
  const durationTotalDays = Math.max(0, Math.round(durationDiffMs / (1000 * 60 * 60 * 24)));
  const durationWeeks = (durationTotalDays / 7).toFixed(1);

  // Calculate Business Days (Mon-Fri)
  const calculateBusinessDays = (d1: Date, d2: Date) => {
    if (d1 > d2) return 0;
    let count = 0;
    const cur = new Date(d1);
    while (cur < d2) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  };
  const businessDays = calculateBusinessDays(startD, endD);

  // Holidays
  const currentYear = now.getFullYear();
  const holidays = [
    { name: "New Year's Day", date: `${currentYear + 1}-01-01`, emoji: '🎉' },
    { name: "Valentine's Day", date: `${currentYear + (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14) ? 1 : 0)}-02-14`, emoji: '💖' },
    { name: 'Halloween', date: `${currentYear + (now.getMonth() > 9 ? 1 : 0)}-10-31`, emoji: '🎃' },
    { name: 'Thanksgiving', date: `${currentYear + (now.getMonth() > 10 ? 1 : 0)}-11-26`, emoji: '🦃' },
    { name: 'Christmas Day', date: `${currentYear + (now.getMonth() === 11 && now.getDate() > 25 ? 1 : 0)}-12-25`, emoji: '🎄' },
  ];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventName || !newEventDate) return;
    setCustomEvents(prev => [
      ...prev,
      { id: Date.now().toString(), name: newEventName, date: newEventDate }
    ]);
    setNewEventName('');
    setNewEventDate('');
    recordToolAction('countdown-calculator', 2);
  };

  const handleDeleteEvent = (id: string) => {
    setCustomEvents(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header with FailFlow citation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-800">
            <CalendarClock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              FailFlow Date & Countdown Hub
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                $12K/Month Model
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live date calculators, holiday counters, and precision time trackers modeled after FailFlow.com.
            </p>
          </div>
        </div>

        {/* Blueprint info button */}
        <button
          onClick={() => setShowBlueprintModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 text-xs font-bold transition-colors cursor-pointer"
        >
          <Flame className="w-4 h-4 text-purple-500" />
          <span>Why FailFlow makes $12K/Mo</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => { setActiveTab('until'); recordToolAction('countdown-calculator', 1); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'until'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Weeks / Days Until Date
        </button>
        <button
          onClick={() => { setActiveTab('duration'); recordToolAction('countdown-calculator', 1); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'duration'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Date Duration & Difference
        </button>
        <button
          onClick={() => { setActiveTab('holidays'); recordToolAction('countdown-calculator', 1); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'holidays'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          Holiday Countdowns
        </button>
        <button
          onClick={() => { setActiveTab('custom'); recordToolAction('countdown-calculator', 1); }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          My Custom Events ({customEvents.length})
        </button>
      </div>

      {/* Tab 1: Weeks Until Any Date */}
      {activeTab === 'until' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Select Target Future or Past Date
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="date"
                value={targetDateStr}
                onChange={(e) => setTargetDateStr(e.target.value)}
                className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-400">
                Targeting: <strong>{targetDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              </span>
            </div>
          </div>

          {/* Big Live Countdown Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-lg shadow-blue-500/10">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{isPast ? 'Time Elapsed Since Date' : 'Live Real-Time Countdown'}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 text-center">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-3xl sm:text-5xl font-black font-mono">{totalDays}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-100 mt-1">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-3xl sm:text-5xl font-black font-mono">{remainingHours}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-100 mt-1">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-3xl sm:text-5xl font-black font-mono">{remainingMinutes}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-100 mt-1">Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                <div className="text-3xl sm:text-5xl font-black font-mono text-amber-300">{remainingSeconds}</div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-100 mt-1">Seconds</div>
              </div>
            </div>

            {/* Precision Sub-stats */}
            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                Total Weeks: <strong className="text-amber-300 font-mono text-sm">{totalWeeks} Weeks</strong>
              </div>
              <div>
                Total Hours: <strong className="font-mono text-sm">{totalHours.toLocaleString()} Hours</strong>
              </div>
              <div>
                Weekends Away: <strong className="font-mono text-sm">{Math.floor(totalDays / 7)} Weekends</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Duration Between 2 Dates */}
      {activeTab === 'duration' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-400">Total Calendar Days</div>
              <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">
                {durationTotalDays}
              </div>
              <div className="text-xs text-slate-500 mt-1">({durationWeeks} weeks)</div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-400">Business / Working Days</div>
              <div className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                {businessDays}
              </div>
              <div className="text-xs text-slate-500 mt-1">(Excludes weekends)</div>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-bold uppercase text-slate-400">Total Hours</div>
              <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mt-2">
                {(durationTotalDays * 24).toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">Non-stop hours</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Holiday Countdowns */}
      {activeTab === 'holidays' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {holidays.map((h, i) => {
            const hDate = new Date(`${h.date}T00:00:00`);
            const hDiffMs = hDate.getTime() - now.getTime();
            const hDays = Math.max(0, Math.ceil(hDiffMs / (1000 * 60 * 60 * 24)));
            const hWeeks = (hDays / 7).toFixed(1);

            return (
              <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <span className="text-3xl">{h.emoji}</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{h.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {hDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">{hDays}d</div>
                  <div className="text-[11px] text-slate-400">{hWeeks} wks</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Custom Events */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          <form onSubmit={handleAddEvent} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Event Name</label>
              <input
                type="text"
                placeholder="e.g. Dream Trip to Japan"
                value={newEventName}
                onChange={(e) => setNewEventName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                required
              />
            </div>
            <div className="w-full sm:w-56">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Date</label>
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {customEvents.map(event => {
              const eDate = new Date(`${event.date}T00:00:00`);
              const eDiff = eDate.getTime() - now.getTime();
              const eDays = Math.ceil(eDiff / (1000 * 60 * 60 * 24));
              const isEventPast = eDays < 0;

              return (
                <div key={event.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{event.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {eDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-lg font-black font-mono text-purple-600 dark:text-purple-400">
                        {isEventPast ? `${Math.abs(eDays)}d ago` : `${eDays}d`}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {isEventPast ? 'Elapsed' : 'Remaining'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
