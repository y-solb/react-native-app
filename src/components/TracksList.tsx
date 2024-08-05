import { FlatList, FlatListProps, View, Text } from 'react-native'
import { TracksListItem } from './TracksListItem'
import { utilsStyles } from '@/styles'
import TrackPlayer, { Track } from 'react-native-track-player'
import FastImage from 'react-native-fast-image'
import { unknownTrackImageUri } from '@/constants/images'
import { useRef } from 'react'
import { useQueue } from '@/store/queue'

export type TracksListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ id, tracks, ...flatlistProps }: TracksListProps) => {
	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isChangingQueue = id !== activeQueueId
		if (isChangingQueue) {
			const beforeTrack = tracks.slice(0, trackIndex)
			const afterTrack = tracks.slice(trackIndex + 1)

			await TrackPlayer.reset()

			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTrack)
			await TrackPlayer.add(beforeTrack)

			await TrackPlayer.play()
			queueOffset.current = trackIndex
			setActiveQueueId(id)
		} else {
			const nextTrackIndex =
				trackIndex - queueOffset.current < 0
					? tracks.length + trackIndex - queueOffset.current
					: trackIndex - queueOffset.current

			await TrackPlayer.skip(nextTrackIndex)
			await TrackPlayer.play()
		}
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			// 리스트 마지막에 구분선 추가
			ListFooterComponent={ItemDivider}
			// 각 항목 사이에 구분선을 추가
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No songs found</Text>
					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
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
