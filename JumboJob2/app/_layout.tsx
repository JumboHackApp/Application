import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SavedJobsProvider } from "../context/SavedJobsContext"; // Import the context provider

export default function RootLayout() {
  return (
    <SavedJobsProvider> {/* Wrap Tabs in Provider */}
      <Tabs
        screenOptions={{
          headerShown: false, // Hides the top bar
          tabBarStyle: { backgroundColor: "#fff", height: 60 },
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarActiveTintColor: "#4990e2",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        {/* Hidden Tabs */}
        <Tabs.Screen name="postEvent" options={{ href: null }} />
        <Tabs.Screen name="JobSwipeApp" options={{ href: null }} />

      </Tabs>
    </SavedJobsProvider> // Close Provider
  );
}
