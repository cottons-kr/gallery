import images from '@/public/meta.json'
import Image from 'next/image'
import styles from '@/styles/components/Preview.module.scss'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useState } from 'react'
import classNames from 'classnames'
import { useSetRecoilState } from 'recoil'
import { imageState } from '@/atoms/common'

interface PreviewProps {
  image: typeof images[0]
}
export function Preview(props: PreviewProps) {
  const { image } = props
  const [hovered, setHovered] = useState(false)
  const setImage = useSetRecoilState(imageState)
  const ratio = 200 / image.meta.resolution[0]
  const onClick = () => {
    setImage({ current: image })
  }

  const infoVariants: Variants = {
    hidden: {
      y: '100%',
      transition: {
        duration: 4.5,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    visible: {
      y: '0%',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  }
  const titleVariants: Variants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: -20,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  }

  return <>
    <div
      className={classNames(styles.preview, hovered && styles.hovered)} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <Image src={image.path} alt={image.title} width={200} height={image.meta.resolution[1] * ratio} />
      <AnimatePresence>{
        hovered ?
          <motion.div
            className={styles.info} variants={infoVariants}
            initial='hidden' animate='visible' exit='hidden'
          /> :
          null
      }</AnimatePresence>
      <AnimatePresence>{
        hovered ?
          <motion.h2
            className={styles.title} variants={titleVariants}
            initial='hidden' animate='visible' exit='hidden'
          >{image.title}</motion.h2> :
          null
      }</AnimatePresence>
    </div>
  </>
}
