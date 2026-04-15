'use client';

import React from 'react';
import { Button } from '../ui/Button';

export function EbookBanner() {
  return (
    <section className="pt-16 pb-0 md:pt-24 md:pb-0 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-brand-yellow border-2 border-brand-black rounded-2xl p-6 md:p-8">
            <p
              className="text-2xl md:text-3xl font-bold text-brand-black mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Less conflict. More understanding. Real communication skills for teens.
            </p>

            <p
              className="text-base md:text-lg text-brand-black mb-6"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Learn how to stay calm, speak clearly, and earn more trust from your parents.
            </p>

            <div className="flex justify-center">
              <a
                href="https://mieraapp.gumroad.com/l/realtalk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-brand-violet !text-brand-white hover:!bg-brand-black hover:!text-brand-white"
                >
                  Get the book
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
