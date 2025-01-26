'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '~/components/ui/card';

const BENCHMARK_DATA = [
  {
    name: 'Startup Time',
    unit: 'seconds',
    description:
      'Time taken for the server to fully start and be ready to accept connections. Lower startup time means faster server deployment and restarts.',
    Purpur: 17.5,
    Canvas: 15.8,
  },
  {
    name: 'Hopper Tick',
    unit: 'milliseconds',
    description:
      'Time to process 161,000 hoppers in a single tick. Demonstrates item handling and transfer efficiency, crucial for automated farms and storage systems.',
    Purpur: 60,
    Canvas: 32,
  },
  {
    name: 'Villager Tick',
    unit: 'seconds',
    description:
      'Processing time for 300 villagers over 20 minutes. Shows entity AI and pathfinding optimization, essential for trading halls and village-based mechanics.',
    Purpur: 310,
    Canvas: 165,
  },
  {
    name: 'Chunk Generation',
    unit: 'CPS',
    description:
      'Number of new chunks that can be generated per second. Higher values mean faster world exploration and less lag when discovering new areas.',
    Purpur: 130,
    Canvas: 140,
    'Canvas (Alt)': 220,
  },
];

const COLORS = {
  Purpur: '#A855F7',
  Canvas: '#3B82F6',
  'Canvas (Alt)': '#FBBF24',
};

interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    fill: string;
    payload: {
      unit: string;
    };
  }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-3 shadow-xl">
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
          <span className="text-neutral-300">{entry.name}:</span>
          <span className="font-medium text-white">
            {entry.value.toLocaleString()} {entry.payload.unit}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function BenchmarkSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Performance Benchmarks</h2>
        <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
          Real-world performance comparisons between Canvas and Purpur. Lower is better for all metrics except chunk
          generation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {BENCHMARK_DATA.map((data) => (
          <Card key={data.name} className="p-6">
            <h3 className="text-lg font-semibold text-white">{data.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">{data.description}</p>
            <div className="mt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[data]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barGap={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="name" stroke="#737373" hide />
                  <YAxis
                    stroke="#737373"
                    label={{
                      value: data.unit,
                      angle: -90,
                      position: 'insideLeft',
                      style: { fill: '#737373' },
                    }}
                    tickMargin={8}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '1.5rem',
                    }}
                  />
                  <Bar dataKey="Purpur" fill={COLORS.Purpur} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Canvas" fill={COLORS.Canvas} radius={[4, 4, 0, 0]} />
                  {data['Canvas (Alt)'] && (
                    <Bar
                      dataKey="Canvas (Alt)"
                      fill={COLORS['Canvas (Alt)']}
                      name="Canvas (Alt Algorithm)"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm text-neutral-400">
        The benchmarks shown are tested on:
        <br />
        32 GB - Intel(R) Core(TM) i9-14900HX 2.20 GHz - Windows 11, with the villagers test run on 16GB - Intel(R)
        Core(TM) i5-6200U - Arch linux
      </p>
    </section>
  );
}
