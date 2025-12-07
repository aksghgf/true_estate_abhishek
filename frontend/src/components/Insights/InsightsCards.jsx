import { formatCurrency, formatNumber } from '../../utils/helpers';
import { Package, DollarSign, Tag } from 'lucide-react';

export default function InsightsCards({ insights }) {
  if (!insights) return null;

  const cards = [
    {
      title: 'Total units sold',
      value: formatNumber(insights.totalUnits),
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Total Amount',
      value: formatCurrency(insights.totalAmount),
      subtext: `(${formatCurrency(insights.totalAmount / (insights.totalUnits || 1))}/unit)`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Total Discount',
      value: formatCurrency(insights.totalDiscount),
      subtext: `(${((insights.totalDiscount / insights.totalAmount) * 100).toFixed(1)}%)`,
      icon: Tag,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              {card.subtext && (
                <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
              )}
            </div>
            <div className={`${card.bg} ${card.color} p-3 rounded-lg`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
