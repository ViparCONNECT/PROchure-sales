export type AuthModalMode = "login" | "register";

const EVENT = "openAuth";

/** Opens the login / register popup rendered by Layout. */
export function openAuthModal(mode: AuthModalMode = "login") {
    window.dispatchEvent(new CustomEvent<AuthModalMode>(EVENT, { detail: mode }));
}

export function onOpenAuthModal(cb: (mode: AuthModalMode) => void): () => void {
    const handler = (e: Event) => cb((e as CustomEvent<AuthModalMode>).detail ?? "login");
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
}
