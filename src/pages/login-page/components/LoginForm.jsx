import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const MOCK_CREDENTIALS = {
  email: 'alex.rivera@alumni.edu',
  password: 'Alumni@2024',
};

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors?.[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (authError) setAuthError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (
      formData?.email?.toLowerCase() === MOCK_CREDENTIALS?.email?.toLowerCase() &&
      formData?.password === MOCK_CREDENTIALS?.password
    ) {
      navigate('/dashboard');
    } else {
      setAuthError(
        `Invalid credentials. Use demo account: ${MOCK_CREDENTIALS?.email} / ${MOCK_CREDENTIALS?.password}`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {authError && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{
            background: 'rgba(239,68,68,0.06)',
            borderColor: 'rgba(239,68,68,0.25)',
          }}
          role="alert"
          aria-live="assertive"
        >
          <Icon name="AlertCircle" size={18} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-body" style={{ color: 'var(--color-error)' }}>
            {authError}
          </p>
        </div>
      )}
      <div>
        <Input
          label="Email Address"
          type="email"
          id="email"
          name="email"
          placeholder="your@alumni.edu"
          value={formData?.email}
          onChange={handleChange}
          error={errors?.email}
          required
          disabled={loading}
        />
      </div>
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleChange}
          error={errors?.password}
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 flex items-center justify-center w-8 h-8 rounded-md text-text-secondary hover:text-foreground transition-colors duration-250"
          style={{ top: errors?.password ? '34px' : '34px' }}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={0}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} color="currentColor" />
        </button>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm font-body font-500 transition-colors duration-250 hover:underline"
          style={{ color: 'var(--color-accent)' }}
        >
          Forgot password?
        </button>
      </div>
      <Button
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        disabled={loading}
        type="submit"
        iconName={loading ? undefined : 'LogIn'}
        iconPosition="right"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}