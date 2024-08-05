import { create } from 'zustand'
import library from '@/assets/data/library.json'
import { Artist, TrackWithPlaylist, Playlist } from '@/helpers/types'
import { Track } from 'react-native-track-player'
import { unknownTrackImageUri } from '@/constants/images'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (track.url === currentTrack.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}
				return currentTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (track.url === currentTrack.url) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), playlistName],
					}
				}
				return currentTrack
			}),
		})),
}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const favorites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	return {
		favorites,
		toggleTrackFavorite,
	}
}

export const useArtists = () =>
	useLibraryStore((state) =>
		state.tracks.reduce((acc, track) => {
			const existingArtist = acc.find((item) => item.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[]),
	)

export const usePlaylists = () => {
	const playlists = useLibraryStore((state) =>
		state.tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((item) => item.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist.tracks.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			})

			return acc
		}, [] as Playlist[]),
	)
	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	return {
		playlists,
		addToPlaylist,
	}
}
