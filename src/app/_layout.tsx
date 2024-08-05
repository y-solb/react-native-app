import { useLogTrackPlayerState } from '@/hooks/useLogTrackPlayerState'
import { useSetupTrackPlayer } from '@/hooks/useSetupTrackPlayer'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { colors } from '@/constants/tokens'
import TrackPlayer from 'react-native-track-player'
import { playbackService } from '@/constants/playbackService'

// 앱이 준비될 때까지 스플래시 스크린을 표시
SplashScreen.preventAutoHideAsync()

TrackPlayer.registerPlaybackService(() => playbackService)

const App = () => {
	const handleTrackPlayerLoaded = useCallback(() => {
		// 스플래시 스크린을 숨김
		SplashScreen.hideAsync()
	}, [])

	useSetupTrackPlayer({
		onLoad: handleTrackPlayerLoaded,
	})

	useLogTrackPlayerState()

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

// SafeAreaProvider: 안전 영역을 관리하여 장치의 노치, 상태 바, 홈 인디케이터 등을 피하는 데 사용
// SafeAreaProvider: 하위 모든 컴포넌트, 전체에 안전 영역 컨텍스트를 제공
// GestureHandlerRootView: 제스처 핸들링을 위해 루트 뷰를 래핑
// SafeAreaView: 개별 뷰 또는 컴포넌트를 안전 영역 내에 렌더링
// RootNavigation: 네비게이션 구조를 정의
// StatusBar: 상태 표시줄의 스타일을 설정

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

			<Stack.Screen
				name="player"
				options={{
					presentation: 'card',
					gestureEnabled: true,
					gestureDirection: 'vertical',
					animationDuration: 400,
					headerShown: false,
				}}
			/>

			<Stack.Screen
				name="(modals)/addToPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerTitle: 'Add to playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
		</Stack>
	)
}

// Stack: 화면 내비게이션을 설정

export default App
