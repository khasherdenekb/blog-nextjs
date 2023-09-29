import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface blogType {
  title: string;
  contentImage: string;
  authorImage: string;
  authorName: string;
  content: string;
  date: Date | any;
}
