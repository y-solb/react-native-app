/**
 * 주어진 초를 "MM:SS" 형식의 문자열로 변환하는 함수
 * @param seconds 변환할 초 단위의 시간
 * @returns "MM:SS" 형식으로 변환된 시간 문자열
 */
export const formatSecondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}`
}
/**
 * 탭 이름과 검색어로 고유한 ID를 생성하는 함수
 * @param trackListName 탭 이름
 * @param search 검색어
 * @returns 탭 이름-검색어
 */
export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}
