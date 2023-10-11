import React, { useState, useEffect } from "react";

/**
 * @returns an error message if web bluetooth is not supported by the browser
 */
export default function useBluetoothError(): string | undefined {
  const [error, setError] = useState<string>();

  async function getBluetoothError(): Promise<void> {
    if (navigator.bluetooth == null || !(await navigator.bluetooth.getAvailability())) {
      if (navigator.userAgent.includes('iPhone')) {
        setError("Web Bluetooth is not supported on iPhone. Please use Chrome on desktop or Android.");
      } else {
        setError("Your browser does not support Web Bluetooth. Please use Chrome on desktop or Android.");
      }
    }
  }
  useEffect(() => {
    getBluetoothError()
  }, []);

  return error;
}