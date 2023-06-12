import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import InitLocalStorage from "./InitLocalStorage.js";
import { UserDataProvider } from "./userDataBase/userDataContext";

import { ToastContainer } from "react-toastify";
import { AppFunctionalitiesProvider } from "./contexts/appFunctionalitiesContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5 // 5 minutos
    }
  }
});

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InitLocalStorage />
      <AppFunctionalitiesProvider>
        <UserDataProvider>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ToastContainer />
            <App />
          </Box>
        </UserDataProvider>
      </AppFunctionalitiesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
