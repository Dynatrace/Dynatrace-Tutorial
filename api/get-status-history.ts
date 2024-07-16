const statusMap = {
  'disruption': {
    color: 'critical',
    description: 'Service disruption',
  },
  'partial-disruption': {
    color: 'warning',
    description: 'Partial service disruption',
  },
  'operational': {
    color: 'success',
    description: 'Operational',
  },
};

export default async function (payload: { active: boolean } = undefined) {
  const res = await fetch('https://dt-url.net/status-history');
  let history = await res.json();

  if (payload) {
    history = history.filter(({ active }) => active === payload.active);
  }

  return history.map((item) => ({
    ...item,
    color: statusMap[item.status].color,
    description: statusMap[item.status].description,
  }));
}