import './highlightedText.css'

interface HighlightedTextProps {
  children?: React.ReactNode | React.ReactNode[]
  tooltip?: string
}

const HighlightedText = ({ children, tooltip = '' }: HighlightedTextProps) => {
  return (
    <span className="highlighted-text" title={tooltip}>
      {children}
    </span>
  )
}
export default HighlightedText
