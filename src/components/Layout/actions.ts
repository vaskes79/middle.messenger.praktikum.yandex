export const openPanel = "OPEN_PANEL";
export type NamePanel = 'settings' | 'chatlist' | 'chatsettings';

export function togglePanel(name: NamePanel) {
  dispatchEvent(new CustomEvent(openPanel, {
    bubbles: true,
    cancelable: false,
    composed: false,
    detail: {
      name
    }
  }))
}
