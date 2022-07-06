export const NotificationPermission = () => {
  if (Notification.permission !== "granted") {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }
}
