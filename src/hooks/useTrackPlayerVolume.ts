import { useCallback, useEffect, useState } from 'react'
import TrackPlayer from 'react-native-track-player'

// 현재 볼륨, 볼륨을 업데이트하는 함수를 리턴
export const useTrackPlayerVolume = () => {
	const [volume, setVolume] = useState<number | undefined>(undefined)

	const getVolume = useCallback(async () => {
		const currentVolume = await TrackPlayer.getVolume()
		setVolume(currentVolume)
	}, [])

	const updateVolume = useCallback(async (newVolume: number) => {
		if (newVolume < 0 || newVolume > 1) return

		setVolume(newVolume)

		await TrackPlayer.setVolume(newVolume)
	}, [])

	useEffect(() => {
		getVolume()
	}, [getVolume])

	return { volume, updateVolume }
}
