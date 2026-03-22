import { useState, useCallback } from "react";
import { isConnected, getPublicKey } from "@lobstrco/signer-extension-api";
import { waitForLobstr } from "../utils/detectLobstr";

export function useLobstr() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [network, setNetwork] = useState(null);

  const connect = useCallback(async () => {
    if (isConnecting) return null;

    setError(null);
    setIsConnecting(true);

    try {
      const detected = await waitForLobstr(3000);
      if (!detected) {
        throw new Error("NOT_INSTALLED");
      }

      const connectionResult = await isConnected();
      // Not strictly necessary as it will throw or fail on getPublicKey if locked, but good check
      if (!connectionResult) {
        console.warn("LOBSTR isConnected() returned false, attempting connection anyway...");
      }

      // prompts the user and gets key
      const pkResult = await getPublicKey();
      
      let address = "";
      if (typeof pkResult === 'string' && pkResult.startsWith('G')) {
          address = pkResult;
      } else if (pkResult && pkResult.publicKey) {
          address = pkResult.publicKey;
      } else if (pkResult && pkResult.error) {
          throw new Error(pkResult.error);
      }
      
      if (!address) {
          throw new Error("ACCESS_DENIED");
      }

      let currentNetwork = "PUBLIC"; // LOBSTR is predominantly mainnet 

      setPublicKey(address);
      setNetwork(currentNetwork);
      console.log(`[LOBSTR] Connected (${currentNetwork}):`, address);
      return { success: true, address, network: currentNetwork };

    } catch (err) {
      console.error("[LOBSTR] Error:", err.message);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  return { connect, isConnecting, publicKey, network, error };
}
