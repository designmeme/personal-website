export function gaEvent(category: string, action: string, label?: string) {
    console.log('gaEvent', category, action, label)
    // guard against SSR
    if (typeof window !== "undefined") {
        return
    }

    if ((window as any).gtag) {
        (window as any).gtag('event', action, {
            'event_category': category,
            'event_label': label,
        })
    }
}
