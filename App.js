import { StatusBar } from "expo-status-bar";
import AppNavigation from "./components/AppNavigation";
import DatabaseProvider from "./utils/database";
import NetworkCheck from "./utils/networkCheck";

export default function App() {
    return (
        <DatabaseProvider>
            <StatusBar style='auto' />
            <NetworkCheck />
            <AppNavigation />
        </DatabaseProvider>
    );
}
