import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import AuthShell from '../../components/layout/AuthShell';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await registerUser(data);
      toast.success('Account created. Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell heading="Create your account" subheading="Start managing your pipeline in minutes.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full name"
          icon={<User size={18} />}
          type="text"
          placeholder="Jane Cooper"
          autoComplete="name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input
          label="Email address"
          icon={<Mail size={18} />}
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          icon={<Lock size={18} />}
          type={showPassword ? 'text' : 'password'}
          placeholder="At least 6 characters"
          autoComplete="new-password"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
          error={errors.password?.message}
          hint="Use 6 or more characters."
        />
        <Select
          label="Role"
          {...register('role', { required: 'Role is required' })}
          error={errors.role?.message}
          options={[
            { value: '', label: 'Select a role' },
            { value: 'sales', label: 'Sales Representative' },
            { value: 'admin', label: 'Administrator' },
          ]}
        />
        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg" className="mt-1">
          {!loading && <>Create account <ArrowRight size={18} /></>}
          {loading && 'Creating account…'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
};

export default RegisterPage;
