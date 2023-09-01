import { StatusBar } from "expo-status-bar";
import AppNavigation from "./components/AppNavigation";
import DatabaseProvider from "./utils/database";
export default function App() {
    return (
        <DatabaseProvider>
            <StatusBar style='auto' />
            <AppNavigation />
        </DatabaseProvider>
    );
}
