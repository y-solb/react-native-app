import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { StyleSheet, TouchableHighlight, View, Text, TouchableHighlightProps } from 'react-native'
import FastImage from 'react-native-fast-image' // 이미지를 빠르게 로드하고 표시
import { AntDesign } from '@expo/vector-icons'
import { Playlist } from '@/helpers/types'

export type PlaylistListItemProps = TouchableHighlightProps & {
	playlist: Playlist
	onPress: () => void
}

export const PlaylistListItem = ({ playlist, onPress }: PlaylistListItemProps) => {
	return (
		// 터치 가능한 영역
		<TouchableHighlight onPress={onPress}>
			<View style={styles.playlistItemContainer}>
				<View>
					<FastImage
						source={{
							uri: playlist.artworkPreview,
							priority: FastImage.priority.normal,
						}}
						style={styles.playlistArtworkImage}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
					}}
				>
					<Text numberOfLines={1} style={styles.playlistNameText}>
						{playlist.name}
					</Text>
					<AntDesign name="right" size={16} color={colors.icon} style={{ opacity: 0.5 }} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	playlistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 90,
	},
	playlistArtworkImage: {
		borderRadius: 8,
		width: 70,
		height: 70,
	},
	playlistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		fontWeight: '600',
		maxWidth: '80%',
	},
})
