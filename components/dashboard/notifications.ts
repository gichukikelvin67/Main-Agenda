export type Notification = {
  id: number;
  title: string;
  message: string;
  type: "payment" | "sale" | "stock";
  read: boolean;
};

const STORAGE_KEY = "mpesa_pos_notifications";

// Get all notifications
export function getNotifications(): Notification[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    return JSON.parse(saved) as Notification[];
  } catch (error) {
    console.error("Failed to load notifications:", error);
    return [];
  }
}

// Save notifications
export function saveNotifications(
  notifications: Notification[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(notifications)
    );

    // Tell Topbar that notifications changed
    window.dispatchEvent(
      new Event("notificationsUpdated")
    );
  } catch (error) {
    console.error(
      "Failed to save notifications:",
      error
    );
  }
}

// Add a new notification
export function addNotification(
  notification: Omit<Notification, "id" | "read">
): void {
  if (typeof window === "undefined") {
    return;
  }

  const currentNotifications = getNotifications();

  const newNotification: Notification = {
    ...notification,
    id: Date.now(),
    read: false,
  };

  const updatedNotifications = [
    newNotification,
    ...currentNotifications,
  ];

  saveNotifications(updatedNotifications);
}

// Delete all notifications
export function clearNotifications(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);

  window.dispatchEvent(
    new Event("notificationsUpdated")
  );
}