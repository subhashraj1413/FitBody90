import { Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { AppCard } from './AppCard';

type ChartCardProps = {
  title: string;
  labels: string[];
  values: number[];
  suffix?: string;
};

export function ChartCard({ title, labels, values, suffix = '' }: ChartCardProps) {
  const width = Math.min(Dimensions.get('window').width - 48, 420);
  const safeValues = values.length ? values : [0];
  const safeLabels = labels.length ? labels : ['Now'];

  return (
    <AppCard className="gap-3">
      <Text className="text-base font-black text-whiteSoft">{title}</Text>
      <LineChart
        data={{
          labels: safeLabels.slice(-5),
          datasets: [{ data: safeValues.slice(-5) }],
        }}
        width={width}
        height={180}
        yAxisSuffix={suffix}
        chartConfig={{
          backgroundGradientFrom: '#181818',
          backgroundGradientTo: '#181818',
          decimalPlaces: 1,
          color: () => '#FF2A2A',
          labelColor: () => '#9A9A9A',
          propsForDots: { r: '4', strokeWidth: '2', stroke: '#E10600' },
        }}
        bezier
        withInnerLines={false}
        style={{ borderRadius: 18, marginLeft: -12 }}
      />
    </AppCard>
  );
}
