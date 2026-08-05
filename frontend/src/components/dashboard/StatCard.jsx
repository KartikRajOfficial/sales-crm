import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

/**
 * StatCard — headline metric tile with an animated count-up.
 *
 * Props (unchanged):
 *  - title, value (numeric), icon (lucide component)
 *  - color: violet | cyan | emerald | amber
 *  - format: optional formatter applied to the animated value (e.g. currency)
 *  - trend:  optional string like "+12%"
 */
const colorVariants = {
  violet: { chip: 'bg-violet-500/12 text-violet-300', glow: 'bg-violet-500/20', ring: 'from-violet-500/40' },
  cyan: { chip: 'bg-cyan-500/12 text-cyan-300', glow: 'bg-cyan-500/20', ring: 'from-cyan-500/40' },
  emerald: { chip: 'bg-emerald-500/12 text-emerald-300', glow: 'bg-emerald-500/20', ring: 'from-emerald-500/40' },
  amber: { chip: 'bg-amber-500/12 text-amber-300', glow: 'bg-amber-500/20', ring: 'from-amber-500/40' },
};

const StatCard = ({ title, value = 0, icon: Icon, color = 'violet', format, trend }) => {
  const [count, setCount] = useState(0);
  const target = Number(value) || 0;
  const variant = colorVariants[color] || colorVariants.violet;
  const isPositive = trend?.startsWith('+');
  const isNegative = trend?.startsWith('-');

  // Ease-out count-up from 0 → target.
  useEffect(() => {
    let frame;
    const duration = 1000;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setCount(target);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const display = format ? format(count) : Math.round(count).toLocaleString();

  return (
    <Card className="p-5 overflow-hidden relative group" hover>
      {/* Corner glow bloom on hover */}
      <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${variant.glow}`} />

      <div className="relative flex items-start justify-between">
        <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${variant.chip} ring-1 ring-inset ring-white/[0.06]`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : isNegative ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-gray-400'}`}>
            {trend}
          </span>
        )}
      </div>

      <div className="relative mt-4">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-3xl font-bold text-white font-display tracking-tight tabular-nums"
        >
          {display}
        </motion.div>
      </div>
    </Card>
  );
};

export default StatCard;
