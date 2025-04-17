'use client'

import { useRouter } from 'next/navigation'
import { useMusicPlayer } from '@/context/MusicPlayerContext'

export const usePodcastNavigate = () => {
    const { setCurrentIndex, playPlaylist } = useMusicPlayer()
    const router = useRouter()

    const handlePlayAndNavigate = (index, item) => {
        setCurrentIndex(index)
        playPlaylist(item.subSongs, 0, true)

        const slug = item.author.toLowerCase().replace(/\s+/g, '-')
        const encodedData = encodeURIComponent(JSON.stringify(item))

        router.push(`/dashboard/podcasts/${slug}?data=${encodedData}`)
    }

    return handlePlayAndNavigate
}