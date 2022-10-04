import styles from './index.module.css';
import Image from 'next/image';
import path from 'path';
path.resolve('./next.config.js');

export function Index() {
  return (
    // <div className={styles.page}>
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-xl text-lime-500 pt-12">Hello User!</h1>
        <div className="w-72 pt-8 pb-96">
          <Image
            className="rounded-2xl "
            src="https://newk.mo.cloudinary.net/sim2.webp"
            alt="beau gosse de course"
            placeholder="blur"
            blurDataURL="https://newk.mo.cloudinary.net/sim2-placeholder.webp"
            layout="responsive"
            width={960}
            height={963}
            quality={100}
            loading="eager"
            priority
          />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Index;
