interface StorageData {
  users: Record<string, any>;
  properties: Record<string, any>;
  reviews: Record<string, any>;
}

const STORAGE_KEY = "app_data";

// Initialize storage with empty data structure
const initializeStorage = () => {
  if (!sessionStorage.getItem(STORAGE_KEY)) {
    const initialData: StorageData = {
      users: {},
      properties: {},
      reviews: {},
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

// Get storage data
const getStorageData = (): StorageData => {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

// Save storage data
const saveStorageData = (data: StorageData) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export { initializeStorage, getStorageData, saveStorageData };
