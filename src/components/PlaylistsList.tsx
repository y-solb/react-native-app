import { View, Text, FlatListProps, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Playlist } from '@/helpers/types'
import { utilsStyles } from '@/styles'
import { unknownTrackImageUri } from '@/constants/images'
import { PlaylistListItem } from './PlaylistListItem'

export type PlaylistsListProps = Partial<FlatListProps<Playlist>> & {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export const PlaylistsList = ({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatlistProps
}: PlaylistsListProps) => {
	return (
		<FlatList
			data={playlists}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			// 리스트 마지막에 구분선 추가
			ListFooterComponent={ItemDivider}
			// 각 항목 사이에 구분선을 추가
			ItemSeparatorComponent={ItemDivider}
			// list에 header 추가
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No playlist found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
			)}
			{...flatlistProps}
		/>
	)
}
