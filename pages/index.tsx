import styles from '@/styles/home.module.scss'
import images from '@/public/meta.json'
import { Preview } from '@/components/Preview'

export default function Home() {
  return <>
    <section className={styles.home}>
      <h1>Gallery</h1>
      <div className={styles.list}>{
        images.map(i => <Preview key={i.title} image={i} />)
      }</div>
    </section>
  </>
}
