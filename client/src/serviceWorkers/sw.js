import { deviceType, mobileModel, mobileVendor, osName, browserName } from "react-device-detect";

const userId = localStorage.getItem("id")

const device_details = {
    os: osName,
    type: deviceType,
    device_model: mobileModel,
    brand: mobileVendor,
    browserName: browserName
}

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


export const sw = () => {
    //Setup Service Worker
    let isSubscribed = false;
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        // navigator.serviceWorker.register('./notificationWorker.js')
        console.log('Push messaging is supported')
    } else {
        console.error('Push messaging is not supported')
        return;
    }
    if (Notification.permission === 'denied') {
        return;
    }

    const publicUrl = new URL(window.location.href);
    if (publicUrl.origin !== window.location.origin) {
        console.error('service worker origin does not match url origin')
        return;
    }

    navigator.serviceWorker.ready
        .then(async (registration) => {
            if (userId && userId !== "") {
                const subscription = await registration.pushManager.getSubscription();
                if (subscription) {
                    isSubscribed = true
                    return subscription;
                }
                const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/keys`)
                const publicKey = await resp.text()

                const publicKeyUintArray = urlB64ToUint8Array(publicKey)

                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: publicKeyUintArray
                })
            }
            return null

        }).then((subscription) => {
            if (subscription) {
                const subEndpoint = localStorage.getItem('push_message_endpoint')
                const tokenExpired = subscription.endpoint !== subEndpoint
                if (!isSubscribed || tokenExpired) {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        body: JSON.stringify({ userId: userId, token: subscription, deviceDetails: device_details })
                    }).then((response) => {
                        isSubscribed = true
                        localStorage.setItem('push_message_endpoint', subscription.endpoint)
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }
        })

}

export const swUnregister = async () => {
    try {
        let registration = await navigator.serviceWorker.ready
        let subscription = await registration.pushManager.getSubscription()
        if (subscription) {
            fetch(`http://localhost:3002/register`, {
                method: 'delete',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ user_id: 111, token: subscription, device_details })
            }).then(() => {
                subscription.unsubscribe()
            })

        }
    } catch (error) {
        console.error('Error unsubscribing: ', error)
    }
}