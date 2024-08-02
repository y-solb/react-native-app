import { FlatList, FlatListProps, View } from 'react-native'
import { TracksListItem } from './TracksListItem'
import { utilsStyles } from '@/styles'
import { Track } from 'react-native-track-player'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatlistProps }: TracksListProps) => {
	const handleTrackSelect = (track: Track) => {
		console.log(track)
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			// 리스트 마지막에 구분선 추가
			ListFooterComponent={ItemDivider}
			// 각 항목 사이에 구분선을 추가
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TracksListItem
					track={{ ...track, image: track.artwork }}
					onTrackSelect={handleTrackSelect}
				/>
			)}
			{...flatlistProps}
		/>
	)
}
