export function gaEvent(category: string, action: string, label?: string, value?: number) {
    process.env.NODE_ENV === "development" && console.log('(dev) gaEvent called', category, action, label, value)

    if ((window as any).gtag) {
        (window as any).gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value,
        })
    }
}
