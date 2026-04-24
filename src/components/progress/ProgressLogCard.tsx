import { Text, View } from 'react-native';

import { AppCard } from '@/src/components/ui/AppCard';
import { ProgressLog } from '@/src/types';

type ProgressLogCardProps = {
  log: ProgressLog;
};

export function ProgressLogCard({ log }: ProgressLogCardProps) {
  return (
    <AppCard>
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-[10px] font-bold uppercase tracking-widest text-grayText">{log.date}</Text>
          <View className="mt-2 flex-row items-end gap-5">
            <View>
              <Text className="text-2xl font-black tracking-tight text-whiteSoft">{log.weight.toFixed(1)}</Text>
              <Text className="text-[10px] text-grayText">kg</Text>
            </View>
            <View className="mb-1 h-5 w-px bg-white/[0.08]" />
            <View>
              <Text className="text-2xl font-black tracking-tight text-whiteSoft">{log.waist.toFixed(1)}</Text>
              <Text className="text-[10px] text-grayText">cm waist</Text>
            </View>
          </View>
          {log.notes ? <Text className="mt-2.5 text-sm leading-5 text-grayText">{log.notes}</Text> : null}
        </View>
        <View className="rounded-full border border-red/30 bg-red/[0.07] px-2.5 py-1">
          <Text className="text-[10px] font-extrabold uppercase tracking-wider text-redBright">Logged</Text>
        </View>
      </View>
    </AppCard>
  );
}
