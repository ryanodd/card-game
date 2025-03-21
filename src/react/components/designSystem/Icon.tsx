import { ComponentPropsWithoutRef, ComponentType, forwardRef, HTMLAttributes } from "react"

import AirSvg from "../../../../public/icons/air.svg"
import ArrowLeftSvg from "../../../../public/icons/arrowLeft.svg"
import ArrowRightSvg from "../../../../public/icons/arrowRight.svg"
import CloseSvg from "../../../../public/icons/close.svg"
import EarthSvg from "../../../../public/icons/earth.svg"
import ExternalLinkSvg from "../../../../public/icons/externalLink.svg"
import FireSvg from "../../../../public/icons/fire.svg"
import HammerSvg from "../../../../public/icons/hammer.svg"
import MailSvg from "../../../../public/icons/mail.svg"
import MenuSvg from "../../../../public/icons/menu.svg"
import NoMobileSvg from "../../../../public/icons/noMobile.svg"
import WaterSvg from "../../../../public/icons/water.svg"

import iconStyles from "./icon.module.css"

export type IconProps = ComponentPropsWithoutRef<"svg"> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
}

export const createIcon = (SVG: ComponentType<HTMLAttributes<SVGSVGElement>>, label: string) => {
  const iconComponent = forwardRef<SVGSVGElement, IconProps>(({ size = "lg", ...props }, ref) => {
    return (
      <SVG
        className={iconStyles.icon}
        data-size={size}
        // @ts-ignore
        ref={ref}
        alt={label}
      />
    )
  })
  iconComponent.displayName = label
  return iconComponent
}

export const Air = createIcon(AirSvg, "Air")
export const ArrowLeft = createIcon(ArrowLeftSvg, "Left")
export const ArrowRight = createIcon(ArrowRightSvg, "Right")
export const Close = createIcon(CloseSvg, "Close")
export const Earth = createIcon(EarthSvg, "Earth")
export const ExternalLink = createIcon(ExternalLinkSvg, "External Link")
export const Fire = createIcon(FireSvg, "AFireir")
export const Hammer = createIcon(HammerSvg, "Hammer")
export const Mail = createIcon(MailSvg, "Mail")
export const Menu = createIcon(MenuSvg, "Menu")
export const NoMobile = createIcon(NoMobileSvg, "No Mobile Devices")
export const Water = createIcon(WaterSvg, "Water")
