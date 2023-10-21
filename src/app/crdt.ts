
export interface CRDTValue<T> {
  userId: string;
  timestamp: number;
  value: T;
}

export function CRDTisUpdateNeeded<T>(local: CRDTValue<T>, remote: CRDTValue<T>) {
  if (remote.timestamp < local.timestamp) {
    return false;
  } else if (remote.timestamp === local.timestamp && remote.userId < local.userId) {
    return false;
  } else {
    return true;
  }
}