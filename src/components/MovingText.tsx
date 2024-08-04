import { useEffect } from 'react'
import Animated, {
	Easing,
	StyleProps,
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

export type MovingTextProps = {
	text: string
	animationThreshold: number // 애니메이션을 시작할 텍스트 길이의 임계값
	style?: StyleProps
}

// 텍스트가 일정 길이 이상일 때 애니메이션으로 움직이는 컴포넌트
export const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animationThreshold

	const textWidth = text.length * 3

	useEffect(() => {
		if (!shouldAnimate) return

		translateX.value = withDelay(
			// 지연으로 애니메이션 실행
			1000,
			withRepeat(
				withTiming(-textWidth, {
					duration: 5000,
					easing: Easing.linear,
				}),
				-1,
				true,
			),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [translateX, text, animationThreshold, shouldAnimate, textWidth])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	return (
		<Animated.Text
			numberOfLines={1}
			style={[
				style,
				animatedStyle,
				shouldAnimate && {
					width: 9999,
					paddingLeft: 16,
				},
			]}
		>
			{text}
		</Animated.Text>
	)
}
