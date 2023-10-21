import { CRDTValue } from "./crdt";
import store from "./store";

export function createCRDTValue<T>(value: T): CRDTValue<T> {
  const timestamp = Date.now();
  const userId = store.getState().user.userId ?? 'anonymous';
  return {
    userId,
    timestamp,
    value,
  }
}