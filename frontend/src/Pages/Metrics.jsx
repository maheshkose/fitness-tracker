import { MetricAreaChart } from '@/Components/MyComponents/AreaCharts';
import AddBodyMetric from '@/Components/MyComponents/Bodymetrics/AddBodyMetric';
import { Button } from '@/Components/ui/button';
import { useAppContext } from '@/Context/AppContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Metrics = () => {
  const { getAllBodyMetrics } = useAppContext();

  const [bodymetrics, setbodymetrics] = useState([]);
  const [showBMForm, setshowBMForm] = useState(false);

  const getAllBodyMetricsHandler = async () => {
    const res = await getAllBodyMetrics();
    if (res.data.success) {
      toast.success(res.data.message || 'Body metrics fetched successfully');
      setbodymetrics(res.data.metrics);
    } else {
      toast.error(res.data.message || 'Failed to fetch body metrics');
    }
  };

  useEffect(() => {
    getAllBodyMetricsHandler();
  }, [bodymetrics.length]);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] dark:text-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">Progress overview</p>
              <h1 className="text-3xl font-semibold tracking-tight">Body metrics dashboard</h1>
              <p className="max-w-2xl text-sm text-slate-600 sm:text-base dark:text-slate-300">
                Track your progress over time and add the latest measurements in one place.
              </p>
            </div>
            <Button
              onClick={() => setshowBMForm(!showBMForm)}
              className="rounded-full bg-cyan-600 px-5 text-sm font-medium text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              {showBMForm ? 'Close form' : 'Add metric'}
            </Button>
          </div>
        </div>

        {showBMForm && (
          <div className="w-full">
            <AddBodyMetric getAllBodyMetricsHandler={getAllBodyMetricsHandler} setshowBMForm = {setshowBMForm}/>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bodymetrics?.length ? (
            bodymetrics.map((metric) => (
              <div
                key={metric._id}
                className="rounded-3xl border border-slate-200/80 bg-white/80 p-3 shadow-lg shadow-slate-200/60 backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/20"
              >
                <div className="mb-3 flex items-center justify-between rounded-2xl bg-slate-100/80 px-3 py-2 dark:bg-slate-800/70">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Metric set</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{metric.metrics?.[0]?.type || 'Body metric'}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                    {metric.metrics?.length || 0} entries
                  </span>
                </div>
                <MetricAreaChart chartData={metric.metrics} chartMetricType={metric._id} />
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center shadow-inner shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/60 dark:shadow-black/20">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">No metrics yet</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Start by adding your first measurement to populate your dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Metrics;