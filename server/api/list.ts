import * as fs from 'fs'

export default defineEventHandler(async (event) => {
  const text = fs.readFileSync('./db/china.m3u8', 'utf8')
  // const data = await fetch('https://iptv-org.github.io/iptv/index.m3u')
  const playlist = parseM3U(text)

  return playlist.tracks
})

function parseM3U(content: string) {
  const lines = content.split('\n')
  const playlist = {
    header: lines[0],
    tracks: []
  }

  let track
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('#EXTINF:')) {
      // 新的曲目开始
      if (track) {
        playlist.tracks.push(track)
      }
      const info = line.substring(8).split(',')
      const title = info[1].trim()
      const logo = extractTvgLogo(line)
      track = { title, logo, url: '' }
    } else if (line && track) {
      // 曲目的 URL
      track.url = line
    }
  }

  // 添加最后一个曲目
  if (track) {
    playlist.tracks.push(track)
  }

  return playlist
}

function extractTvgLogo(line) {
  const regex = /tvg-logo=\"(.+?)\"/
  const match = regex.exec(line)
  if (match && match.length > 1) {
    return match[1]
  }
  return ''
}