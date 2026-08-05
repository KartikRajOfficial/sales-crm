import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Search, Pencil, Trash2, Building2, Mail, Phone } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import * as customerService from '../../services/customerService';
import useDebounce from '../../hooks/useDebounce';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/tables/DataTable';
import Pagination from '../../components/ui/Pagination';
import PageHeader from '../../components/ui/PageHeader';

const CustomersPage = () => {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const sortParam = `${sortOrder === 'asc' ? '' : '-'}${sortKey}`;
      const res = await customerService.getCustomers({
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
        sort: sortParam,
      });
      // Backend responds with { customers, total, totalPages, page, limit }
      setCustomers(res.customers || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearch, sortKey, sortOrder]);

  const openModal = (customer = null) => {
    setSelectedCustomer(customer);
    if (customer) {
      reset({
        companyName: customer.companyName,
        contactPerson: customer.contactPerson,
        email: customer.email,
        phone: customer.phone,
        industry: customer.industry || '',
        notes: customer.notes || '',
      });
    } else {
      reset({ companyName: '', contactPerson: '', email: '', phone: '', industry: '', notes: '' });
    }
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setSelectedCustomer(null); };
  const openDeleteModal = (customer) => { setSelectedCustomer(customer); setDeleteModalOpen(true); };
  const closeDeleteModal = () => { setDeleteModalOpen(false); setSelectedCustomer(null); };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      if (selectedCustomer) {
        await customerService.updateCustomer(selectedCustomer._id, data);
        toast.success('Customer updated successfully');
      } else {
        await customerService.createCustomer(data);
        toast.success('Customer created successfully');
      }
      closeModal();
      fetchCustomers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving customer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await customerService.deleteCustomer(selectedCustomer._id);
      toast.success('Customer deleted successfully');
      closeDeleteModal();
      fetchCustomers();
    } catch (err) {
      toast.error('Error deleting customer');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'companyName',
      label: 'Company',
      sortable: true,
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
      sortable: true,
      render: (val, row) => (
        <div className="space-y-0.5">
          {val && <p className="flex items-center gap-1.5 text-gray-300"><Mail size={12} className="text-gray-500" />{val}</p>}
          {row.phone && <p className="flex items-center gap-1.5 text-xs text-gray-500"><Phone size={12} />{row.phone}</p>}
          {!val && !row.phone && <span className="text-gray-600">—</span>}
        </div>
      ),
    },
    {
      key: 'industry',
      label: 'Industry',
      sortable: true,
      render: (val) => (val ? <Badge variant={{ bg: 'bg-white/[0.06]', text: 'text-gray-300' }} dot={false}>{val}</Badge> : <span className="text-gray-600">—</span>),
    },
    {
      key: 'actions',
      label: '',
      render: (_, item) => (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" onClick={() => openModal(item)} aria-label="Edit customer"><Pencil size={16} /></Button>
          {user?.role === 'admin' && (
            <Button variant="danger" size="sm" onClick={() => openDeleteModal(item)} aria-label="Delete customer"><Trash2 size={16} /></Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        icon={Building2}
        title="Customers"
        subtitle="Your active accounts and their key contacts"
        action={<Button variant="primary" icon={Plus} onClick={() => openModal()}>Add Customer</Button>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5 p-3 rounded-2xl bg-[#12121c]/60 border border-white/[0.06]">
        <div className="flex-1">
          <Input icon={<Search size={18} />} placeholder="Search by company, contact or email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={customers}
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
        emptyIcon={Building2}
        emptyMessage="No customers yet"
        emptyDescription="Add your first customer or adjust your search to see results here."
      />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} total={total} pageSize={10} />

      {/* Create / Edit */}
      <Modal isOpen={modalOpen} onClose={closeModal} title={selectedCustomer ? 'Edit Customer' : 'Add Customer'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Company Name" {...register('companyName', { required: 'Required' })} error={errors.companyName?.message} />
          <Input label="Contact Person" {...register('contactPerson', { required: 'Required' })} error={errors.contactPerson?.message} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" {...register('email')} />
            <Input label="Phone" {...register('phone')} />
          </div>
          <Input label="Industry" placeholder="e.g. SaaS, Manufacturing" {...register('industry')} />
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Notes</label>
            <textarea className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white px-3.5 py-2.5 text-sm placeholder:text-gray-500 focus:bg-white/[0.06] focus:border-violet-500/70 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all min-h-[100px]" placeholder="Add context about this account…" {...register('notes')} />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit" loading={submitting}>{selectedCustomer ? 'Save Changes' : 'Create Customer'}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete */}
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal} title="Delete customer" size="sm">
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            Delete <span className="font-medium text-white">{selectedCustomer?.companyName}</span>? This can't be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.06]">
            <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} loading={submitting}>Delete customer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomersPage;
