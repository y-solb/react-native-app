import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
	return (
		<SafeAreaProvider>
			<RootNavigation />
			<StatusBar style="auto" />
		</SafeAreaProvider>
	)
}

// SafeAreaProvider: 안전 영역을 관리하여 장치의 노치, 상태 바, 홈 인디케이터 등을 피하는 데 사용
// SafeAreaProvider: 하위 모든 컴포넌트, 전체에 안전 영역 컨텍스트를 제공
// SafeAreaView: 개별 뷰 또는 컴포넌트를 안전 영역 내에 렌더링
// RootNavigation: 네비게이션 구조를 정의
// StatusBar: 상태 표시줄의 스타일을 설정

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	)
}

// Stack: 화면 내비게이션을 설정

export default App
