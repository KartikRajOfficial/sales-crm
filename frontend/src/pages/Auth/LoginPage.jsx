import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import AuthShell from '../../components/layout/AuthShell';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // AuthContext.login expects a single credentials object.
      await login({ email: data.email, password: data.password });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell heading="Sign in" subheading="Welcome back — enter your details to continue.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        <Button type="submit" variant="primary" fullWidth loading={loading} size="lg" className="mt-1">
          {!loading && <>Sign in <ArrowRight size={18} /></>}
          {loading && 'Signing in…'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
          Create one
        </Link>
      </p>
    </AuthShell>
  );
};

export default LoginPage;
