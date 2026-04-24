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
  const safeLabels = labels.length ? labels : ['—'];

  return (
    <AppCard className="gap-4">
      <Text className="text-base font-black tracking-tight text-whiteSoft">{title}</Text>
      <LineChart
        data={{
          labels: safeLabels.slice(-6),
          datasets: [{ data: safeValues.slice(-6) }],
        }}
        width={width}
        height={176}
        yAxisSuffix={suffix}
        chartConfig={{
          backgroundGradientFrom: '#181818',
          backgroundGradientTo: '#181818',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 42, 42, ${opacity})`,
          labelColor: () => '#666666',
          propsForDots: { r: '5', strokeWidth: '2', stroke: '#E10600', fill: '#FF2A2A' },
          propsForBackgroundLines: { stroke: 'rgba(255,255,255,0.04)', strokeDasharray: '' },
          fillShadowGradientFrom: '#FF2A2A',
          fillShadowGradientTo: '#181818',
          fillShadowGradientFromOpacity: 0.25,
          fillShadowGradientToOpacity: 0,
        }}
        bezier
        withInnerLines
        withOuterLines={false}
        style={{ borderRadius: 16, marginLeft: -12 }}
      />
    </AppCard>
  );
}
