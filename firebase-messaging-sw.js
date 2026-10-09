// Register click handling before loading Firebase.
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil((async () => {
        const target = new URL('./easyearn.html?notice=1',self.location.href);
        const windows = await clients.matchAll({type:'window',includeUncontrolled:true});
        for (const client of windows) {
            if (client.url.split('?')[0] === target.href.split('?')[0]) {
                await client.navigate(target.href);return client.focus();
            }
        }
        return clients.openWindow(target.href);
    })());
});
importScripts('https://www.gstatic.com/firebasejs/12.2.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.2.1/firebase-messaging-compat.js');
firebase.initializeApp({
    apiKey: "AIzaSyCpwfTWOsU6Gb3rLvMjcKnewLMnlkq5plg",
    authDomain: "amar-bazar-d99b4.firebaseapp.com",
    databaseURL: "https://amar-bazar-d99b4-default-rtdb.firebaseio.com",
    projectId: "amar-bazar-d99b4",
    storageBucket: "amar-bazar-d99b4.firebasestorage.app",
    messagingSenderId: "1000008221916",
    appId: "1:1000008221916:web:6bd19561f4b64e2002e019",
    measurementId: "G-NHCVXFW0E4"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage(payload => {
    if (payload.notification) return; // FCM displays notification payloads automatically.
    return self.registration.showNotification(payload.data?.title || 'EasyEarn', {
        body:payload.data?.body || 'নতুন নোটিস এসেছে', icon:'./icons/easyearn-icon-192.png',
        image:payload.data?.image || undefined,
        tag:payload.data?.noticeId || undefined
    });
});
