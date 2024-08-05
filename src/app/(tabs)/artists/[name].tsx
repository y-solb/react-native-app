import { ArtistTracksList } from '@/components/ArtistTracksList'
import { screenPadding } from '@/constants/tokens'
import { useArtists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View, ScrollView } from 'react-native'

const ArtistDetailScreen = () => {
	// 현재 페이지의 URL parameters만 처리 (useGlobalSearchParams는 전체에서 접근 가능한 )
	const { name: artistName } = useLocalSearchParams<{ name: string }>()

	const artists = useArtists()
	const artist = artists.find((artist) => artist.name === artistName)

	if (!artist) {
		console.warn(`Artist ${artistName} not found!`)
		return <Redirect href={'/(tabs)/artists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<ArtistTracksList artist={artist} />
			</ScrollView>
		</View>
	)
}

export default ArtistDetailScreen
