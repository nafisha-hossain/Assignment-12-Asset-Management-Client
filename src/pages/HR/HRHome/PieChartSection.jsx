import { useQuery } from '@tanstack/react-query';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PieChartSection = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ['chart-data', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/assets/count/${user?.email}`);
      return data;
    },
  });

  const COLORS = ['#4CAF50', '#FF6384'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight="bold"
        fontSize={14}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Generate dynamic insights based on data if available
  const getInsights = (data) => {
    if (!data || data.length === 0) return [];
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    return data.map((item) => ({
      text: `${item.name} accounts for ${((item.value / total) * 100).toFixed(
        1
      )}% of total items.`,
    }));
  };

  const insights = getInsights(data);

  return (
    <section>
      <SectionTitle title="Returnable vs Non-returnable Items" />
      <div className="mt-12 rounded-lg border border-gray-300 p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Pie Chart */}
          <div className="w-full max-w-md">
            <PieChart width={320} height={350}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                innerRadius={55}
                fill="#8884d8"
                dataKey="value"
                cornerRadius={8}
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  borderRadius: '8px',
                  border: 'none',
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconSize={16}
                wrapperStyle={{ fontWeight: '600' }}
              />
            </PieChart>
          </div>

          {/* Insights and Data */}
          <div className="w-full max-w-lg space-y-8">
            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-5 border-b border-gray-300 pb-3 text-2xl font-semibold text-gray-700 dark:text-gray-100">
                Key Insights
              </h3>
              {insights.length > 0 ? (
                <ul className="list-disc space-y-3 pl-5 text-gray-700 dark:text-gray-300">
                  {insights.map((insight, idx) => (
                    <li key={idx} className="text-lg">
                      {insight.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  No insights available yet.
                </p>
              )}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-5 border-b border-gray-300 pb-3 text-2xl font-semibold text-gray-700 dark:text-gray-100">
                Data Breakdown
              </h3>
              <table className="w-full table-auto text-left text-gray-700 dark:text-gray-300">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 py-2 font-semibold">
                      Item Type
                    </th>
                    <th className="border-b border-gray-300 py-2 font-semibold">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((entry, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-gray-50 dark:even:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <td className="py-3">{entry.name}</td>
                      <td className="py-3 font-semibold">{entry.value}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PieChartSection;
