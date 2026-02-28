import { useId as reactUseId } from 'react'

export function useId(externalId?: string): string {
  const generatedId = reactUseId()
  return externalId ?? generatedId
}
