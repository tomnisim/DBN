import { type ComponentPropsWithoutRef } from 'react';
import "../index.css";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  href?: never;
  color?: string;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
  href?: string;
  style?: React.CSSProperties;
};

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  const { color, ...restProps } = props as ButtonProps;
  
  const buttonStyle: React.CSSProperties = {
    ...defaultStyle,
    backgroundColor: color || defaultStyle.backgroundColor,
  };

  if (isAnchorProps(props)) {
    return <a className='button' {...restProps} style={props.style}></a>;
  }

  return <button style={buttonStyle} className="button" {...restProps}></button>;
}

const defaultStyle: React.CSSProperties = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '16px',
  outline: 'none',
};
