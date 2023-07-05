import * as React from "react";
import { useEffect, useState } from "react";
import * as Font from 'expo-font';
import Router from "./src/navigation/Router";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'PolySans': require('./assets/fonts/PolySans/PolySansTrial-Bulky.otf'),
    });
    setFontLoaded(true);
  }
  
  // Call the loadFonts function when the app starts
  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    loadFonts();
    return null;
  }

  return (
    <Router />
  );
}
