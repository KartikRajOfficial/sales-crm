import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Pencil, Trash2, TrendingUp, SlidersHorizontal, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import * as opportunityService from '../../services/opportunityService';
import * as customerService from '../../services/customerService';
import { OPPORTUNITY_STAGES, OPPORTUNITY_STAGE_COLORS } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';
import useDebounce from '../../hooks/useDebounce';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/tables/DataTable';
import Pagination from '../../components/ui/Pagination';
import PageHeader from '../../components/ui/PageHeader';

const OpportunitiesPage = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [stageFilter, setStageFilter] = useState('All');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Debounce the value-range inputs so we don't fire a request per keystroke.
  const debouncedMin = useDebounce(minValue, 500);
  const debouncedMax = useDebounce(maxValue, 500);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const sortParam = `${sortOrder === 'asc' ? '' : '-'}${sortKey}`;
      const res = await opportunityService.getOpportunities({
        page: currentPage,
        limit: 10,
        stage: stageFilter === 'All' ? '' : stageFilter,
        minValue: debouncedMin || '',
        maxValue: debouncedMax || '',
        sort: sortParam,
      });
      // Backend responds with { opportunities, total, totalPages, page, limit }
      setOpportunities(res.opportunities || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      toast.error('Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomersForDropdown = async () => {
    try {
      const res = await customerService.getCustomers({ limit: 100 });
      const list = res.customers || [];
      setCustomersList(list.map((c) => ({ value: c._id, label: c.companyName })));
    } catch (err) {
      console.error('Failed to fetch customers for dropdown', err);
    }
  };

  // Reset to the first page whenever any filter changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [stageFilter, debouncedMin, debouncedMax]);

  useEffect(() => {
    fetchOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, stageFilter, debouncedMin, debouncedMax, sortKey, sortOrder]);

  useEffect(() => {
    fetchCustomersForDropdown();
  }, []);

  const hasActiveFilters = stageFilter !== 'All' || minValue !== '' || maxValue !== '';
  const clearFilters = () => { setStageFilter('All'); setMinValue(''); setMaxValue(''); };

  const openModal = (opp = null) => {
    setSelectedOpp(opp);
    if (opp) {
      reset({
        dealName: opp.dealName,
        customer: opp.customer?._id || opp.customer,
        value: opp.value,
        stage: opp.stage,
        expectedCloseDate: opp.expectedCloseDate ? new Date(opp.expectedCloseDate).toISOString().split('T')[0] : '',
        notes: opp.notes || '',
      });
    } else {
      reset({ dealName: '', customer: '', value: '', stage: OPPORTUNITY_STAGES[0], expectedCloseDate: '', notes: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setSelectedOpp(null); };
  const openDeleteModal = (opp) => { setSelectedOpp(opp); setDeleteModalOpen(true); };
  const closeDeleteModal = () => { setDeleteModalOpen(false); setSelectedOpp(null); };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const payload = { ...data, value: Number(data.value) };
      if (selectedOpp) {
        await opportunityService.updateOpportunity(selectedOpp._id, payload);
        toast.success('Opportunity updated successfully');
      } else {
        await opportunityService.createOpportunity(payload);
        toast.success('Opportunity created successfully');
      }
      closeModal();
      fetchOpportunities();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving opportunity');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await opportunityService.deleteOpportunity(selectedOpp._id);
      toast.success('Opportunity deleted successfully');
      closeDeleteModal();
      fetchOpportunities();
    } catch (err) {
      toast.error('Error deleting opportunity');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'dealName',
      label: 'Deal',
      render: (val, row) => (
        <div>
          <p className="font-medium text-white">{val}</p>
          <p className="text-xs text-gray-500">{row.customer?.companyName || '—'}</p>
        </div>
      ),
    },
    { key: 'value', label: 'Value', sortable: true, render: (val) => <span className="font-semibold text-white tabular-nums">{formatCurrency(val)}</span> },
    { key: 'stage', label: 'Stage', sortable: true, render: (val) => <Badge variant={OPPORTUNITY_STAGE_COLORS[val] || 'default'}>{val}</Badge> },
    { key: 'expectedCloseDate', label: 'Expected Close', sortable: true, render: (val) => <span className="text-gray-400">{formatDate(val)}</span> },
    {
      key: 'actions',
      label: '',
      render: (_, item) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => openModal(item)} aria-label="Edit opportunity"><Pencil size={16} /></Button>
          {user?.role === 'admin' && (
            <Button variant="danger" size="sm" onClick={() => openDeleteModal(item)} aria-label="Delete opportunity"><Trash2 size={16} /></Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        icon={TrendingUp}
        title="Opportunities"
        subtitle="Deals moving through your pipeline"
        action={<Button variant="primary" icon={Plus} onClick={() => openModal()}>Add Opportunity</Button>}
      />

      {/* Filter bar: stage + value range */}
      <div className="mb-5 p-3 rounded-2xl bg-[#12121c]/60 border border-white/[0.06]">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-medium px-1 shrink-0">
            <SlidersHorizontal size={16} /> Filters
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              options={[{ value: 'All', label: 'All Stages' }, ...OPPORTUNITY_STAGES.map((s) => ({ value: s, label: s }))]}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Input type="number" min="0" placeholder="Min $" value={minValue} onChange={(e) => setMinValue(e.target.value)} className="sm:w-32" />
            <span className="text-gray-600">–</span>
            <Input type="number" min="0" placeholder="Max $" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} className="sm:w-32" />
          </div>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 shrink-0">
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={opportunities}
        loading={loading}
        sortKey={sortKey}
        sortOrder={sortOrder}
        onSortChange={(key) => {
          if (key === sortKey) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
          } else {
            setSortKey(key);
            setSortOrder('asc');
          }
        }}
        emptyIcon={TrendingUp}
        emptyMessage="No opportunities yet"
        emptyDescription="Create your first deal or adjust your filters to see results here."
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} total={total} pageSize={10} />

      {/* Create / Edit */}
      <Modal isOpen={modalOpen} onClose={closeModal} title={selectedOpp ? 'Edit Opportunity' : 'Add Opportunity'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Deal Name" {...register('dealName', { required: 'Required' })} error={errors.dealName?.message} />
          <Select
            label="Customer"
            {...register('customer', { required: 'Required' })}
            error={errors.customer?.message}
            options={[{ value: '', label: 'Select a customer' }, ...customersList]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Value ($)" type="number" min="0" {...register('value', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.value?.message} />
            <Select label="Stage" {...register('stage')} options={OPPORTUNITY_STAGES.map((s) => ({ value: s, label: s }))} />
          </div>
          <Input label="Expected Close Date" type="date" {...register('expectedCloseDate')} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Notes</label>
            <textarea className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white px-3.5 py-2.5 text-sm placeholder:text-gray-500 focus:bg-white/[0.06] focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all min-h-[100px]" placeholder="Add context about this deal…" {...register('notes')} />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit" loading={submitting}>{selectedOpp ? 'Save Changes' : 'Create Opportunity'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete */}
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal} title="Delete opportunity" size="sm">
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            Delete <span className="font-medium text-white">{selectedOpp?.dealName}</span>? This can't be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} loading={submitting}>Delete opportunity</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OpportunitiesPage;
