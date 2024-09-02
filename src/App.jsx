
import { RouterProvider } from "react-router-dom";
import router from "./libs/routes/router";
import { ThemeProvider } from "styled-components";
import { theme } from "./libs/styles/theme";

import AuthProvider from './providers/auth-provider'
import TodoProvider from "./providers/todo-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // defaault: 0
      gcTime: 60000 * 5 // default: 5분
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <TodoProvider>
          <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
          </ThemeProvider>
        </TodoProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
export default App;