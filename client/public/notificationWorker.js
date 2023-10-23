self.addEventListener('push',async (event) => {
    const payload = event.data ? JSON.parse(event.data.text()) : {}
    const options = {
        body: payload.body,
        icon: 'favicon.png',
        data: {
            //custom url sent with the request if no custom url the default option is the homepage
            url: payload.actionUrl ? payload.actionUrl : 'https://google.com'
        }
    }

    event.waitUntil(
        self.registration.showNotification(payload.title, options)
    )
})

self.addEventListener('notificationclick', (event) => {
    event.notification.close()
    clients.openWindow(event.notification.data.url)
})

self.addEventListener('install', function () { 
    //upon installation skip waiting for older versions of the Service Worker and active newest one
    self.skipWaiting();
})