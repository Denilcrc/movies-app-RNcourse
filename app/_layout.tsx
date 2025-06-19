import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";

const RootLayout = () => {
  // nowPlayingActions(); //aca vemos la resp de themoviedb
  const queryClient = new QueryClient(); // Access the client

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
};

export default RootLayout;
