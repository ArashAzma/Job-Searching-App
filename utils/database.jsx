import React, { createContext } from "react";
import * as SQLite from "expo-sqlite";
export const dbContext = createContext();
const DatabaseProvider = ({ children }) => {
    const db = SQLite.openDatabase("db.appDb");
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS LIKES (id INTEGER PRIMARY KEY AUTOINCREMENT, jobID INTEGER, employer_logo TEXT, employer_name TEXT, job_title TEXT, job_city TEXT)"
        );
    });
    return <dbContext.Provider value={{ db }}>{children}</dbContext.Provider>;
};
export default DatabaseProvider;
