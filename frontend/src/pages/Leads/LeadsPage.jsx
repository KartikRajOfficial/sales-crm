import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Search, Pencil, Trash2, Users, Mail, Phone } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import * as leadService from '../../services/leadService';
import { LEAD_STATUSES, LEAD_STATUS_COLORS } from '../../utils/constants';
import useDebounce from '../../hooks/useDebounce';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/tables/DataTable';
import Pagination from '../../components/ui/Pagination';
import PageHeader from '../../components/ui/PageHeader';

const LeadsPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await leadService.getLeads({
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
        status: statusFilter === 'All' ? '' : statusFilter,
      });
      // Backend responds with { leads, total, totalPages, page, limit }
      setLeads(res.leads || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  // Reset to the first page whenever the search or filter changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearch, statusFilter]);

  const openModal = (lead = null) => {
    setSelectedLead(lead);
    if (lead) {
      reset({
        companyName: lead.companyName,
        contactPerson: lead.contactPerson,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        notes: lead.notes || '',
      });
    } else {
      reset({ companyName: '', contactPerson: '', email: '', phone: '', status: 'New', notes: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setSelectedLead(null); };
  const openDeleteModal = (lead) => { setSelectedLead(lead); setDeleteModalOpen(true); };
  const closeDeleteModal = () => { setDeleteModalOpen(false); setSelectedLead(null); };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      if (selectedLead) {
        await leadService.updateLead(selectedLead._id, data);
        toast.success('Lead updated successfully');
      } else {
        await leadService.createLead(data);
        toast.success('Lead created successfully');
      }
      closeModal();
      fetchLeads();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving lead');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await leadService.deleteLead(selectedLead._id);
      toast.success('Lead deleted successfully');
      closeDeleteModal();
      fetchLeads();
    } catch (err) {
      toast.error('Error deleting lead');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'companyName',
      label: 'Company',
      render: (val, row) => (
        <div>
          <p className="font-medium text-white">{val}</p>
          <p className="text-xs text-gray-500">{row.contactPerson}</p>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Contact',
      render: (val, row) => (
        <div className="space-y-0.5">
          {val && <p className="flex items-center gap-1.5 text-gray-300"><Mail size={12} className="text-gray-500" />{val}</p>}
          {row.phone && <p className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={12} />{row.phone}</p>}
          {!val && !row.phone && <span className="text-gray-600">—</span>}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge variant={LEAD_STATUS_COLORS[val] || 'default'}>{val}</Badge>,
    },
    {
      key: 'actions',
      label: '',
      render: (_, item) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => openModal(item)} aria-label="Edit lead"><Pencil size={16} /></Button>
          {user?.role === 'admin' && (
            <Button variant="danger" size="sm" onClick={() => openDeleteModal(item)} aria-label="Delete lead"><Trash2 size={16} /></Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        icon={Users}
        title="Leads"
        subtitle="Track and qualify your incoming prospects"
        action={<Button variant="primary" icon={Plus} onClick={() => openModal()}>Add Lead</Button>}
      />

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 p-3 rounded-2xl bg-[#12121c]/60 border border-white/[0.06]">
        <div className="flex-1">
          <Input icon={<Search size={18} />} placeholder="Search by company or contact…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-full sm:w-52">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[{ value: 'All', label: 'All Statuses' }, ...LEAD_STATUSES.map((s) => ({ value: s, label: s }))]}
          />
        </div>
      </div>

      <DataTable columns={columns} data={leads} loading={loading} emptyIcon={Users} emptyMessage="No leads yet" emptyDescription="Add your first lead or adjust your search to see results here." />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} total={total} pageSize={10} />

      {/* Create / Edit */}
      <Modal isOpen={modalOpen} onClose={closeModal} title={selectedLead ? 'Edit Lead' : 'Add Lead'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Company Name" {...register('companyName', { required: 'Required' })} error={errors.companyName?.message} />
          <Input label="Contact Person" {...register('contactPerson', { required: 'Required' })} error={errors.contactPerson?.message} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" {...register('email')} />
            <Input label="Phone" {...register('phone')} />
          </div>
          <Select label="Status" {...register('status')} options={LEAD_STATUSES.map((s) => ({ value: s, label: s }))} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Notes</label>
            <textarea className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white px-3.5 py-2.5 text-sm placeholder:text-gray-500 focus:bg-white/[0.06] focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all min-h-[100px]" placeholder="Add context about this lead…" {...register('notes')} />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit" loading={submitting}>{selectedLead ? 'Save Changes' : 'Create Lead'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete */}
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal} title="Delete lead" size="sm">
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            Delete <span className="font-medium text-white">{selectedLead?.companyName}</span>? This can't be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} loading={submitting}>Delete lead</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadsPage;
