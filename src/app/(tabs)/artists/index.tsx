import { unknownArtistImageUri } from '@/constants/images'
import { screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilsStyles } from '@/styles'
import { Link } from 'expo-router'
import { useMemo } from 'react'
import { FlatList, ScrollView, View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

const ItemDivider = () => (
	<View style={[utilsStyles.itemSeparator, { marginLeft: 50, marginVertical: 12 }]} />
)

const ArtistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
	})

	const artists = useArtists()

	const filteredArtists = useMemo(() => {
		if (!search) return artists

		return artists.filter(artistNameFilter(search))
	}, [search, artists])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				//  네비게이션 바 또는 상태 바와의 중첩 문제를 해결
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<FlatList
					data={filteredArtists}
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
					scrollEnabled={false}
					// 리스트 마지막에 구분선 추가
					ListFooterComponent={ItemDivider}
					// 각 항목 사이에 구분선을 추가
					ItemSeparatorComponent={ItemDivider}
					// list에 header 추가
					ListEmptyComponent={
						<View>
							<Text style={utilsStyles.emptyContentText}>No artists found</Text>
							<FastImage
								source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
								style={utilsStyles.emptyContentImage}
							/>
						</View>
					}
					renderItem={({ item: artist }) => (
						<Link href={`/artists/${artist.name}`} asChild>
							<TouchableHighlight activeOpacity={0.8}>
								<View style={styles.artistItemContainer}>
									<View>
										<FastImage
											source={{
												uri: unknownArtistImageUri,
												priority: FastImage.priority.normal,
											}}
											style={styles.artistImage}
										/>
									</View>
									<View style={{ width: '100%' }}>
										<Text numberOfLines={1} style={styles.artistNameText}>
											{artist.name}
										</Text>
									</View>
								</View>
							</TouchableHighlight>
						</Link>
					)}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})

export default ArtistsScreen
