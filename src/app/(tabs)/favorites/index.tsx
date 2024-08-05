import { TracksList } from '@/components/TracksList'
import { screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { ScrollView, Text, View } from 'react-native'
import { useMemo } from 'react'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { generateTracksListId } from '@/helpers/miscellaneous'

const FavoritesScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const favoriteTracks = useFavorites().favorites

	const filteredFavoritesTracks = useMemo(() => {
		if (!search) return favoriteTracks

		return favoriteTracks.filter(trackTitleFilter(search))
	}, [search, favoriteTracks])

	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.text}>Favorites screen</Text>
			<ScrollView
				//  네비게이션 바 또는 상태 바와의 중첩 문제를 해결
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TracksList
					id={generateTracksListId('favorites', search)}
					tracks={filteredFavoritesTracks}
					// 자체의 스크롤 기능을 비활성화
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default FavoritesScreen
