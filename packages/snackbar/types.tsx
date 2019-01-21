export interface IMDCSnackbarFoundation {
    open(): void;
    close(action: string): void;
    isOpen(): boolean
    getTimeoutMs(): number
    setTimeoutMs(timeoutMs: number): void
    getCloseOnEscape(): boolean
    setCloseOnEscape(closeOnEscape: boolean): void
    handleKeyDown(event: KeyboardEvent): void
    handleActionButtonClick(event: MouseEvent): void
    handleActionIconClick(event: MouseEvent): void
    init(): void
    destroy(): void
}

export interface IMDCSnackbarAdapter {
    addClass(className: string): void
    removeClass(className: string): void
    announce(): void
    notifyOpening(): void
    notifyOpened(): void
    notifyClosing(reason: string): void
    notifyClosed(reason: string): void
}
