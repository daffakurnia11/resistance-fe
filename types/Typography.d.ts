interface TextProps {
  children: React.ReactNode | string;
  className?: string;
  loadingClassName?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  tabIndex?: number;
  as?: keyof JSX.IntrinsicElements;
  isLoading?: boolean;
}
export interface HeadingProps extends TextProps {
  level: 1 | 2 | 3 | 4 | 5;
}
export type ParagraphProps = TextProps
export type SmallProps = TextProps
