import { useCallback, useEffect, useState } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

// 반복모드 설정 관련
export const useTrackPlayerRepeatMode = () => {
	const [repeatMode, setRepeatMode] = useState<RepeatMode>()

	const changeRepeatMode = useCallback(async (repeatMode: RepeatMode) => {
		await TrackPlayer.setRepeatMode(repeatMode)

		setRepeatMode(repeatMode)
	}, [])

	useEffect(() => {
		// 현재 TrackPlayer의 반복 모드를 가져와 repeatMode 설정
		TrackPlayer.getRepeatMode().then(setRepeatMode)
	}, [])

	return { repeatMode, changeRepeatMode }
}
