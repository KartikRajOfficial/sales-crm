import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, TrendingUp, DollarSign, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import StatCard from '../../components/dashboard/StatCard';
import LeadsByStatusChart from '../../components/dashboard/LeadsByStatusChart';
import OpportunityStageChart from '../../components/dashboard/OpportunityStageChart';
import MonthlyTrendChart from '../../components/dashboard/MonthlyTrendChart';
import SalesFunnelChart from '../../components/dashboard/SalesFunnelChart';
import * as dashboardService from '../../services/dashboardService';
import * as leadService from '../../services/leadService';
import * as opportunityService from '../../services/opportunityService';
import * as customerService from '../../services/customerService';
import { formatCurrency } from '../../utils/formatters';
import { LEAD_STATUSES, OPPORTUNITY_STAGES } from '../../utils/constants';

// Canonical funnel order (pipeline progression, excludes "Lost").
const FUNNEL_STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Won'];

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState({
    leadsByStatus: [],
    opportunityStages: [],
    monthlyTrend: [],
    salesFunnel: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Headline stats plus enough raw records to build the charts.
        // (The backend has no dedicated chart endpoints, so we aggregate here.)
        const [dashboardStats, leadsRes, oppsRes, customersRes] = await Promise.all([
          dashboardService.getDashboardStats(),
          leadService.getLeads({ limit: 1000 }),
          opportunityService.getOpportunities({ limit: 1000 }),
          customerService.getCustomers({ limit: 1000 }),
        ]);

        setStats(dashboardStats);

        const leads = leadsRes.leads || [];
        const opportunities = oppsRes.opportunities || [];
        const customers = customersRes.customers || [];

        setChartData({
          leadsByStatus: buildLeadsByStatus(leads),
          opportunityStages: buildOpportunityStages(opportunities),
          monthlyTrend: buildMonthlyTrend(leads, customers),
          salesFunnel: buildSalesFunnel(opportunities),
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
      {/* Greeting banner */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-violet-600/[0.12] via-[#12121c]/60 to-cyan-600/[0.08] p-6">
        <div className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Overview
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-display tracking-tight">
              {greeting}, {user?.name?.split(' ')[0] || 'there'}
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Here's what's happening across your pipeline today.</p>
          </div>
        </div>
      </motion.div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <motion.div variants={itemVariants}>
          <StatCard title="Total Leads" value={stats?.totalLeads || 0} icon={Users} color="violet" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Total Customers" value={stats?.totalCustomers || 0} icon={Building2} color="cyan" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Opportunities" value={stats?.totalOpportunities || 0} icon={TrendingUp} color="emerald" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard title="Pipeline Value" value={stats?.totalPipelineValue || 0} icon={DollarSign} color="amber" format={formatCurrency} />
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div variants={itemVariants}>
          <MonthlyTrendChart data={chartData.monthlyTrend} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <LeadsByStatusChart data={chartData.leadsByStatus} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <OpportunityStageChart data={chartData.opportunityStages} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SalesFunnelChart data={chartData.salesFunnel} />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Chart data builders ─────────────────────────────────────────────
 * Each returns the exact shape its chart component expects. Counts are
 * arranged in canonical status/stage order so colors and ordering stay
 * stable regardless of how many records exist.
 */

// LeadsByStatusChart expects [{ status, count }]
function buildLeadsByStatus(leads) {
  const counts = {};
  leads.forEach((l) => {
    counts[l.status] = (counts[l.status] || 0) + 1;
  });
  return LEAD_STATUSES
    .map((status) => ({ status, count: counts[status] || 0 }))
    .filter((s) => s.count > 0);
}

// OpportunityStageChart expects [{ stage, count, value }]
function buildOpportunityStages(opportunities) {
  const map = {};
  opportunities.forEach((o) => {
    if (!map[o.stage]) map[o.stage] = { count: 0, value: 0 };
    map[o.stage].count += 1;
    map[o.stage].value += o.value || 0;
  });
  return OPPORTUNITY_STAGES
    .map((stage) => ({ stage, count: map[stage]?.count || 0, value: map[stage]?.value || 0 }))
    .filter((s) => s.count > 0);
}

// SalesFunnelChart expects [{ stage, count, value }] in pipeline order.
function buildSalesFunnel(opportunities) {
  const map = {};
  opportunities.forEach((o) => {
    if (!map[o.stage]) map[o.stage] = { count: 0, value: 0 };
    map[o.stage].count += 1;
    map[o.stage].value += o.value || 0;
  });
  return FUNNEL_STAGES.map((stage) => ({
    stage,
    count: map[stage]?.count || 0,
    value: map[stage]?.value || 0,
  }));
}

// MonthlyTrendChart expects [{ month, leads, customers }] sorted chronologically.
function buildMonthlyTrend(leads, customers) {
  const map = {};
  const add = (dateStr, key) => {
    if (!dateStr) return;
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return;
    const sortKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!map[sortKey]) {
      map[sortKey] = {
        sortKey,
        month: d.toLocaleString('en-US', { month: 'short', year: '2-digit' }),
        leads: 0,
        customers: 0,
      };
    }
    map[sortKey][key] += 1;
  };
  leads.forEach((l) => add(l.createdAt, 'leads'));
  customers.forEach((c) => add(c.createdAt, 'customers'));
  return Object.values(map).sort((a, b) => a.sortKey.localeCompare(b.sortKey));
}

export default DashboardPage;
