import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';

const themeOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState('auto');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const storedTheme = localStorage.getItem('salescrm-theme') || 'auto';
    setTheme(storedTheme);
  }, []);

  const handleThemeChange = (value) => {
    setTheme(value);
    localStorage.setItem('salescrm-theme', value);
    toast.success(`Theme preference set to ${value}`);
  };

  const handleProfileSave = () => {
    toast.success('Profile settings saved locally');
  };

  const handlePasswordChange = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }

    toast.success('Password updated successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        subtitle="Manage your account details, theme preferences, and logout safely."
      />

      <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_0.7fr] gap-6">
        <div className="space-y-6">
          <Card className="p-6" hover>
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Profile</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Account information</h2>
              <p className="mt-2 text-sm text-gray-400">Update your name, email, and preferences for your SalesCRM account.</p>
            </div>

            <form onSubmit={handleSubmit(handleProfileSave)} className="space-y-4">
              <Input
                label="Full Name"
                {...register('fullName', { required: 'Full name is required' })}
                error={errors.fullName?.message}
              />
              <Input
                label="Email Address"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={errors.email?.message}
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="w-full sm:max-w-xs">
                  <Select
                    label="Theme Preference"
                    value={theme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    options={themeOptions}
                  />
                </div>
                <Button type="submit" variant="primary">Save profile</Button>
              </div>
            </form>
          </Card>

          <Card className="p-6" hover>
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Security</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Change password</h2>
              <p className="mt-2 text-sm text-gray-400">Update your password with secure validation. No backend update is available in this demo.</p>
            </div>

            <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-4">
              <Input
                label="Current password"
                type="password"
                {...register('currentPassword', { required: 'Current password is required' })}
                error={errors.currentPassword?.message}
              />
              <Input
                label="New password"
                type="password"
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                error={errors.newPassword?.message}
              />
              <Input
                label="Confirm new password"
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                })}
                error={errors.confirmPassword?.message}
              />
              <Button type="submit" variant="primary">Update password</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6" hover>
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Account</p>
              <h2 className="mt-3 text-xl font-semibold text-white">User summary</h2>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                <p className="text-gray-400 text-xs uppercase tracking-[0.18em] mb-2">Name</p>
                <p className="font-medium text-white">{user?.name || '—'}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                <p className="text-gray-400 text-xs uppercase tracking-[0.18em] mb-2">Email</p>
                <p className="font-medium text-white">{user?.email || '—'}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                <p className="text-gray-400 text-xs uppercase tracking-[0.18em] mb-2">Role</p>
                <p className="font-medium text-white capitalize">{user?.role || 'sales'}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6" hover>
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Account actions</p>
              <h2 className="mt-3 text-xl font-semibold text-white">Session controls</h2>
            </div>
            <div className="space-y-4">
              <Button variant="outline" fullWidth onClick={logout}>Sign out</Button>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm text-gray-400">
                Profile changes are stored locally for preview. Connect a backend user endpoint to persist account updates.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
