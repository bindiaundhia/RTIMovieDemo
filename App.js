// Library imports
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Component imports
import RootNavigator from "./src/navigation/rootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        fallback={<ActivityIndicator color="#707070" size="large" />}
      >
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
