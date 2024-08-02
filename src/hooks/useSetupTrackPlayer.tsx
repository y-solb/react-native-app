import { useEffect, useRef } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'

// 트랙 플레이어 초기화
const setupPlayer = async () => {
	// 캐시 크기 설정
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	// 평점 타입 설정, 플레이어 기능 설정
	await TrackPlayer.updateOptions({
		ratingType: RatingType.Heart,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
		],
	})

	// 볼륨 설정
	await TrackPlayer.setVolume(0.3)
	// 반복 모드 설정
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		if (isInitialized.current) return // 이미 초기화된 경우 종료

		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}
