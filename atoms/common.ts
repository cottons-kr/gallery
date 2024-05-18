import { atom } from 'recoil'
import { v4 } from 'uuid'
import images from '@/public/meta.json'

interface ImageState {
  current: typeof images[0] | null
}

export const imageState = atom<ImageState>({
  key: `imageState/${v4()}`,
  default: {
    current: null
  },
})