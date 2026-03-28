const arrowMap: Record<string, string> = {
  N: '↑',
  NE: '↗',
  E: '→',
  SE: '↘',
  S: '↓',
  SW: '↙',
  W: '←',
  NW: '↖'
}

const colorMap: Record<string, string> = {
  enemy: '#ff4d4f',
  zone: '#1890ff',
  reward: '#52c41a',
  optional: '#8c8c8c'
}

export function renderSmartStep(text: string): React.ReactNode[] {
  const regex = /\[(\w+)\]\((.+?)\)|\((N|NE|NW|S|SE|SW|E|W)\)/g
  let lastIndex = 0
  let out: React.ReactNode[] = []
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text)) !== null) {
    if (lastIndex < match.index) {
      out.push(text.slice(lastIndex, match.index))
    }
    if (match[1] && match[2]) {
      out.push(
        <span
          key={key++}
          style={{
            color: colorMap[match[1].toLowerCase()] || match[1].toLowerCase(),
            fontWeight: 'bold'
          }}
        >
          {match[2]}
        </span>
      )
    } else if (match[3]) {
      out.push(
        <span key={key++} style={{ margin: '0 2px' }}>
          {arrowMap[match[3]] || match[3]}
        </span>
      )
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < text.length) {
    out.push(text.slice(lastIndex))
  }
  return out
}
