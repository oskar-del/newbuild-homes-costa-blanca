interface RegionStat {
  value: string;
  label: string;
}

interface RegionHeaderProps {
  name: string;
  tagline: string;
  description: string;
  stats: RegionStat[];
  variant?: 'dark' | 'primary' | 'warm';
  icon?: string;
}

export default function RegionHeader({
  name,
  tagline,
  description,
  stats,
  variant = 'dark',
  icon,
}: RegionHeaderProps) {
  const variants = {
    dark: {
      bg: 'bg-warm-800',
      divider: 'bg-warm-500',
      tagline: 'text-warm-400',
      title: 'text-white',
      desc: 'text-warm-300',
      statValue: 'text-white',
      statLabel: 'text-warm-400',
    },
    primary: {
      bg: 'bg-primary-900',
      divider: 'bg-accent-500',
      tagline: 'text-accent-400',
      title: 'text-white',
      desc: 'text-warm-300',
      statValue: 'text-white',
      statLabel: 'text-warm-400',
    },
    warm: {
      bg: 'bg-warm-100',
      divider: 'bg-accent-500',
      tagline: 'text-accent-600',
      title: 'text-primary-900',
      desc: 'text-warm-700',
      statValue: 'text-primary-900',
      statLabel: 'text-warm-600',
    },
  };

  const styles = variants[variant];

  return (
    <div className={`${styles.bg} py-8`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className={`w-10 h-px ${styles.divider}`} />
              <span className={`${styles.tagline} text-xs font-medium tracking-widest uppercase`}>
                {icon && <span className="mr-1">{icon}</span>}
                {tagline}
              </span>
            </div>
            <h2 className={`text-2xl md:text-3xl font-light ${styles.title} mb-3`}>
              {name}
            </h2>
            <p className={`${styles.desc} leading-relaxed`}>
              {description}
            </p>
          </div>
          <div className={`grid grid-cols-${Math.min(stats.length, 3)} gap-4`}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl font-semibold ${styles.statValue}`}>
                  {stat.value}
                </div>
                <div className={`${styles.statLabel} text-xs`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
