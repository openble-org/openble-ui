import { ReactNode, createContext, useState } from "react";
import { Actions, useMap } from "usehooks-ts";

export interface BluetoothContextType {
  bluetoothDevice: BluetoothDevice | undefined;
  setBluetoothDevice: React.Dispatch<React.SetStateAction<BluetoothDevice | undefined>>

  connectedServices: Omit<Map<string, BluetoothRemoteGATTService>, "set" | "clear" | "delete">
  serviceActions: Actions<string, BluetoothRemoteGATTService>,

  connectedCharacteristics: Omit<Map<string, BluetoothRemoteGATTCharacteristic>, "set" | "clear" | "delete">
  characteristicActions: Actions<string, BluetoothRemoteGATTCharacteristic>,

  connectedDescriptors: Omit<Map<string, BluetoothRemoteGATTDescriptor>, "set" | "clear" | "delete">
  descriptorActions: Actions<string, BluetoothRemoteGATTDescriptor>,
}

export const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export const BluetoothProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice | undefined>();
  const [connectedServices, serviceActions] = useMap<string, BluetoothRemoteGATTService>()
  const [connectedCharacteristics, characteristicActions] = useMap<string, BluetoothRemoteGATTCharacteristic>()
  const [connectedDescriptors, descriptorActions] = useMap<string, BluetoothRemoteGATTDescriptor>()

  return (
    <BluetoothContext.Provider value={{
      bluetoothDevice,
      setBluetoothDevice,
      connectedServices,
      serviceActions,
      connectedCharacteristics,
      characteristicActions,
      connectedDescriptors,
      descriptorActions
    }}>
      {children}
    </BluetoothContext.Provider>
  );
};
