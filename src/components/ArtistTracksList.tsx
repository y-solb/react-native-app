import { View, Text, StyleSheet } from 'react-native'
import { defaultStyles } from '@/styles'
import FastImage from 'react-native-fast-image'
import { unknownArtistImageUri } from '@/constants/images'
import { Artist } from '@/helpers/types'
import { fontSize } from '@/constants/tokens'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { TracksList } from './TracksList'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useMemo } from 'react'
import { trackTitleFilter } from '@/helpers/filter'
import { QueueControls } from './QueueControls'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in songs',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [artist.tracks, search])

	return (
		<TracksList
			id={generateTracksListId(artist.name, search)}
			tracks={filteredArtistTracks}
			// 자체의 스크롤 기능을 비활성화
			scrollEnabled={false}
			hideQueueControls={true}
			ListHeaderComponentStyle={styles.artistHeaderContainer}
			ListHeaderComponent={
				<View>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: unknownArtistImageUri,
								priority: FastImage.priority.high,
							}}
							style={styles.artistImage}
						/>
					</View>
					<Text numberOfLines={1} style={styles.artistNameText}>
						{artist.name}
					</Text>
					{search.length === 0 && (
						<QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
					)}
				</View>
			}
		/>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 200,
	},
	artistImage: {
		width: '60%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
