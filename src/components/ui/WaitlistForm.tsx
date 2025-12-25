'use client';

import { useState, FormEvent } from 'react';
import { Button } from './Button';

interface WaitlistFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

interface WaitlistFormState {
  email: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
}

// RFC 5322 compliant email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email: string): boolean {
  if (!email || email.length < 5 || email.length > 255) {
    return false;
  }
  return EMAIL_REGEX.test(email);
}

export function WaitlistForm({ onSuccess, onError }: WaitlistFormProps) {
  const [state, setState] = useState<WaitlistFormState>({
    email: '',
    isSubmitting: false,
    isSuccess: false,
    error: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error state
    setState(prev => ({ ...prev, error: null }));

    // Client-side validation
    if (!validateEmail(state.email)) {
      const errorMsg = 'Please enter a valid email address';
      setState(prev => ({ ...prev, error: errorMsg }));
      onError?.(errorMsg);
      return;
    }

    // Submit to API
    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Success
      setState({
        email: '',
        isSubmitting: false,
        isSuccess: true,
        error: null,
      });
      onSuccess?.();
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: errorMsg,
      }));
      onError?.(errorMsg);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({
      ...prev,
      email: e.target.value,
      error: null,
      isSuccess: false,
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {state.isSuccess ? (
        <div className="text-center p-6 bg-brand-green/10 rounded-lg">
          <p className="text-lg font-body text-black">
            Thanks for joining! Check your email for confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={state.email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              disabled={state.isSubmitting}
              className="w-full px-4 py-3 border-2 border-black rounded-lg font-body text-base focus:outline-none focus:ring-2 focus:ring-brand-violet disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-invalid={!!state.error}
              aria-describedby={state.error ? 'email-error' : undefined}
            />
            {state.error && (
              <p id="email-error" className="mt-2 text-sm text-brand-red font-body">
                {state.error}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            disabled={state.isSubmitting || !state.email}
            type="submit"
            className="w-full hover:!bg-brand-white hover:!text-brand-black"
          >
            {state.isSubmitting ? 'Joining...' : 'Join the waitlist'}
          </Button>
        </form>
      )}
    </div>
  );
}
