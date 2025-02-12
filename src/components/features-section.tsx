'use client';

import { Gauge, Puzzle, Rocket } from 'lucide-react';
import { Card } from '~/components/ui/card';

const FEATURES_DATA = [
  {
    title: 'Absurdly Fast',
    description:
      'Canvas introduces tons of optimizations and improvements to keep your server insanely fast and stable.',
    icon: Gauge,
  },
  {
    title: 'Why not use Folia instead?',
    description:
      'Canvas offers the perfect balance between Purpur and Folia - great performance while maintaining plugin compatibility.',
    icon: Puzzle,
  },
  {
    title: 'Active Development',
    description:
      'Canvas is actively maintained and improved with regular updates, bug fixes and optimizations to ensure the best possible experience.',
    icon: Rocket,
  },
];

export function FeaturesSection() {
  return (
    <section className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8' id='features'>
      <div className='mx-auto text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>Why Choose Canvas?</h2>
        <p className='mx-auto mt-4 max-w-2xl text-neutral-300'>
          Built for performance without compromising compatibility or stability.
        </p>
      </div>

      <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
        {FEATURES_DATA.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className='flex flex-col p-6'>
              <div className='mb-4 w-fit rounded-xl bg-neutral-900/40 p-2.5 ring-1 ring-neutral-700/50'>
                <Icon className='h-6 w-6 text-white' />
              </div>
              <h3 className='text-lg font-semibold text-white'>{feature.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-neutral-400'>{feature.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
