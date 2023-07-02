import * as React from "react";
import { useEffect } from "react";
import * as Font from 'expo-font';
import Router from "./src/navigation/Router";

export default function App() {
  async function loadFonts() {
    await Font.loadAsync({
      'PolySans': require('./assets/fonts/PolySans/PolySansTrial-Bulky.otf'),
    });
  }
  
  // Call the loadFonts function when the app starts
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <Router />
  );
}
