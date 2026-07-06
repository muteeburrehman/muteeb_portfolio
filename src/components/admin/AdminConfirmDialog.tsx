import type { ReactNode } from 'react'

export type AdminConfirmOptions = {
  title: string
  message: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void | Promise<void>
}

type AdminConfirmDialogProps = {
  open: AdminConfirmOptions | null
  busy?: boolean
  onClose: () => void
}

export function AdminConfirmDialog({ open, busy, onClose }: AdminConfirmDialogProps) {
  if (!open) return null

  const dialog = open

  async function handleConfirm() {
    await dialog.onConfirm()
  }

  return (
    <div className="admin-modal" role="presentation" onClick={onClose}>
      <div
        className="admin-modal__card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        aria-describedby="admin-modal-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal__accent" aria-hidden />
        <h2 id="admin-modal-title" className="admin-modal__title">
          {dialog.title}
        </h2>
        <div id="admin-modal-desc" className="admin-modal__message">
          {dialog.message}
        </div>
        <div className="admin-modal__actions">
          <button type="button" className="admin-modal__btn admin-modal__btn--ghost" onClick={onClose} disabled={busy}>
            {dialog.cancelLabel ?? 'Keep booking'}
          </button>
          <button
            type="button"
            className={`admin-modal__btn${dialog.danger ? ' admin-modal__btn--danger' : ' admin-modal__btn--primary'}`}
            onClick={() => void handleConfirm()}
            disabled={busy}
          >
            {busy ? 'Working…' : (dialog.confirmLabel ?? 'Confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
