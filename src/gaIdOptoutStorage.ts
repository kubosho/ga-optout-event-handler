export type OptoutStorageKey = 'ga:optoutId' | string;

export interface GaIdOptoutStorage {
  getId: () => string | null;
  saveId: (id: string) => void;
  deleteId: () => void;
}

export function createGaIdOptoutStorage(key?: OptoutStorageKey): GaIdOptoutStorage {
  const _key = key || 'ga:optoutId';

  function getId(): string | null {
    return localStorage.getItem(_key);
  }

  function saveId(id: string) {
    localStorage.setItem(_key, id);
  }

  function deleteId() {
    localStorage.removeItem(_key);
  }

  return {
    getId,
    saveId,
    deleteId,
  };
}
