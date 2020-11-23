export function isMobile() {
    const userAgents = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ]

    if (typeof window !== undefined) {
        return Boolean(userAgents.find(userAgent => window.navigator.userAgent.match(userAgent)))
    }
}