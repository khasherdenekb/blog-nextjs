import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface blogType {
  title: string;
  descriptionEN: string;
  descriptionMN: string;
  coverImg: string;
  author: string;
  authorImg: string;
  date: any;
}
