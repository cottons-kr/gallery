import { imageState } from '@/atoms/common'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from '@/styles/components/Focus.module.scss'
import images from '@/public/meta.json'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faAngleLeft, faAngleRight, faCamera, faExpand, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useState } from 'react'

interface ImageContainerProps {
  current: typeof images[0]
}
function ImageContainer(props: ImageContainerProps) {
  const { current } = props
  const [showable, setShowable] = useState(false)

  const maskVariants: Variants = {
    hidden: {
      height: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    visible: {
      height: '100%',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return <>
    <div className={styles.container}>
      <motion.div className={styles.mask} variants={maskVariants} initial='hidden' animate={showable ? 'visible' : 'hidden'}>
        <Image
          src={current.path} alt={current.title} width={current.meta.resolution[0]} height={current.meta.resolution[1]}
          onLoadingComplete={() => setShowable(true)} quality={85}
        />
      </motion.div>
    </div>
  </>
}

interface ImageInfoProps extends ImageContainerProps {}
function ImageInfo(props: ImageInfoProps) {
  const { current } = props
  const setImage = useSetRecoilState(imageState)
  const index = images.findIndex(image => image.title === current.title)
  const onClickRight = () => {
    let next = index + 1
    if (next >= images.length) {
      next = 0
    }
    setImage({ current: images[next] })
  }
  const onClickLeft = () => {
    let prev = index - 1
    if (prev < 0) {
      prev = images.length - 1
    }
    setImage({ current: images[prev] })
  }

  const Info = ({ icon, title, content }: { icon: IconProp, title: string, content: string }) => <>
    <div className={styles.infoItem}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <h3>{title}</h3>
      </div>
      <p>{content}</p>
    </div>
  </>

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i: number) => ({
      opacity: i > 1 ? 0.5 : 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    }),
  }

  return <>
    <div className={styles.info} onClick={e => e.stopPropagation()}>
      <motion.h2 variants={variants} initial='hidden' animate='visible' custom={1}>{current.title}</motion.h2>
      <motion.div className={styles.table} variants={variants} initial='hidden' animate='visible' custom={2}>
        <Info icon={faCalendar} title='Date' content={current.meta.date} />
        <Info icon={faCamera} title='Camera' content={`${current.meta.camera.maker} ${current.meta.camera.model}`} />
        <Info icon={faExpand} title='Resolution' content={`${current.meta.resolution[0]} x ${current.meta.resolution[1]}`} />
        <Info icon={faLocationDot} title='Location' content={current.meta.location} />
        <div className={styles.meta}>
          <span>ISO {current.meta.iso}</span>
          <span>{current.meta['35mmFocalLength']} mm</span>
          <span>{current.meta.exposure.bias} ev</span>
          <span>ƒ {current.meta.fStop}</span> 
          <span>{current.meta.megaPixels} MP</span>
          <span>{current.meta.exposure.time} s</span>
        </div>
      </motion.div>
      <motion.div className={styles.navigator} variants={variants} initial='hidden' animate='visible' custom={3}>
        <FontAwesomeIcon icon={faAngleLeft} onClick={onClickLeft} />
        <span>{index + 1} / {images.length}</span>
        <FontAwesomeIcon icon={faAngleRight} onClick={onClickRight} />
      </motion.div>
    </div>
  </>
}

export function Focus() {
  const [{ current }, setImage] = useRecoilState(imageState)

  const focusVariants: Variants = {
    hidden: {
      y: '-100%',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    visible: {
      y: '0%',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  }

  return <>
    <AnimatePresence>{
      current ? 
        <motion.section
          className={styles.focus} onClick={() => setImage({ current: null })}
          variants={focusVariants} initial='hidden' animate='visible' exit='hidden'
        >
          <div className={styles.root}>
            <ImageContainer current={current} />
            <ImageInfo current={current} />
          </div>
        </motion.section> :
        null  
    }</AnimatePresence>
  </>
}
