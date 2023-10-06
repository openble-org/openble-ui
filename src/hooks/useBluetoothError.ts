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
        setError("Web Bluetooth is not supported in this browser. Please use a compatible browser such as Chrome on desktop or Android.");
      }
    }
  }
  useEffect(() => {
    getBluetoothError()
  }, []);

  return error;
}