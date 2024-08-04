import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

// 마지막으로 활성화된 트랙 정보를 유지
export const useLastActiveTrack = () => {
	const activeTrack = useActiveTrack()
	const [lastActiveTrack, setLastActiveTrack] = useState<Track>()

	useEffect(() => {
		if (!activeTrack) return

		setLastActiveTrack(activeTrack)
	}, [activeTrack])

	return lastActiveTrack
}
