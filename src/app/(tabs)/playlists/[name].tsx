import { PlaylistTracksList } from '@/components/PlaylistTracksList'
import { screenPadding } from '@/constants/tokens'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View, ScrollView } from 'react-native'

const PlaylistScreen = () => {
	// 현재 페이지의 URL parameters만 처리 (useGlobalSearchParams는 전체에서 접근 가능한 )
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()

	const { playlists } = usePlaylists()
	const playlist = playlists.find((playlist) => playlist.name === playlistName)

	if (!playlist) {
		console.warn(`Playlist ${playlistName} was not found!`)
		return <Redirect href={'/(tabs)/playlists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<PlaylistTracksList playlist={playlist} />
			</ScrollView>
		</View>
	)
}

export default PlaylistScreen
