import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-3xl font-black text-whiteSoft">Route not found</Text>
        <Link href="/" className="mt-4 text-base font-bold text-redBright">
          Back to dashboard
        </Link>
      </View>
    </>
  );
}
