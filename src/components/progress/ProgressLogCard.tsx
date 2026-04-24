import { Text, View } from 'react-native';

import { AppCard } from '@/src/components/ui/AppCard';
import { ProgressLog } from '@/src/types';

type ProgressLogCardProps = {
  log: ProgressLog;
};

export function ProgressLogCard({ log }: ProgressLogCardProps) {
  return (
    <AppCard className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="font-bold text-whiteSoft">{log.date}</Text>
        <Text className="text-xs font-black uppercase text-redBright">Logged</Text>
      </View>
      <Text className="text-sm text-grayText">
        {log.weight.toFixed(1)} kg - {log.waist.toFixed(1)} cm waist
      </Text>
      {log.notes ? <Text className="text-sm leading-5 text-whiteSoft">{log.notes}</Text> : null}
    </AppCard>
  );
}
