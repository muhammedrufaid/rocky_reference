/** Routes where the sticky contact widget (call / WhatsApp / chat) is hidden. */
export const CONTACT_WIDGET_HIDDEN_PATHS = ["/recruitment"] as const;

export function isContactWidgetHidden(pathname: string): boolean {
  return CONTACT_WIDGET_HIDDEN_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}
