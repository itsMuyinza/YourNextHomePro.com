import React from 'react';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    name: 'A Website That Converts',
    description: 'We build you a modern, mobile-friendly website designed with one goal: to turn visitors into paying customers.',
  },
  {
    name: '24/7 AI Receptionist',
    description: 'Never miss a lead again. Our AI agent answers calls and books estimates around the clock, even while you sleep.',
  },
  {
    name: 'Targeted Local Ads',
    description: 'We run hyper-local ad campaigns that put your business in front of thousands of homeowners in your highest-value zip codes.',
  },
  {
    name: 'Automated Review System',
    description: 'Effortlessly collect 5-star reviews from your happy customers, building trust and attracting more high-quality leads.',
  }
];

export const WhatYouGet: React.FC = () => {
  return (
    <div className="bg-sage/10 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-terracotta">Stop Guessing, Start Growing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-espresso sm:text-4xl">
            Everything you need to dominate your local market
          </p>
          <p className="mt-6 text-lg leading-8 text-taupe">
            We don't just give you a website. We build you a complete revenue machine that runs itself, so you can focus on what you do best.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-espresso">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-terracotta">
                    <CheckCircle className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-taupe">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
