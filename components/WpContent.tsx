/**
 * WpContent
 *
 * Safely renders WordPress block/HTML content.
 * The content comes from a trusted CMS you control, so
 * dangerouslySetInnerHTML is appropriate here.
 *
 * The `.wp-content` class maps to the CSS rules in globals.css.
 */
interface Props {
  html: string;
  className?: string;
}

export default function WpContent({ html, className = "" }: Props) {
  return (
    <div
      className={`wp-content max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
