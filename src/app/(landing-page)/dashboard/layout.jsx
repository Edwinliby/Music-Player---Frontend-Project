import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import LayoutContent from './_components/layout'

export default function RootLayout({ children }) {
    return (
        <MusicPlayerProvider>
            <LayoutContent>{children}</LayoutContent>
        </MusicPlayerProvider>
    )
}