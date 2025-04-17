import LayoutContent from '@/app/(landing-page)/dashboard/_components/layout'
import { MusicPlayerProvider } from '@/context/MusicPlayerContext';

export default function Notfound() {
    return (
        <MusicPlayerProvider>
            <LayoutContent>
                <div className='w-full h-full flex flex-col gap-2 justify-center items-center'>
                    <h1 className='font-bold text-4xl'>Something went wrong !</h1>
                    <p>404 - It seems like this page doesn&apos;t exist 😶</p>
                </div>
            </LayoutContent>
        </MusicPlayerProvider>
    )
}