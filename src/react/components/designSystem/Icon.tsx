import { ComponentPropsWithoutRef, ComponentType, forwardRef, HTMLAttributes } from "react"

import AirSvg from "../../../../public/icons/air.svg"
import ArrowLeftSvg from "../../../../public/icons/arrowLeft.svg"
import ArrowRightSvg from "../../../../public/icons/arrowRight.svg"
import CheckSvg from "../../../../public/icons/check.svg"
import CircleSvg from "../../../../public/icons/circle.svg"
import CloseSvg from "../../../../public/icons/close.svg"
import DiceSvg from "../../../../public/icons/dice.svg"
import EarthSvg from "../../../../public/icons/earth.svg"
import ExternalLinkSvg from "../../../../public/icons/externalLink.svg"
import FireSvg from "../../../../public/icons/fire.svg"
import GearSvg from "../../../../public/icons/gear.svg"
import HammerSvg from "../../../../public/icons/hammer.svg"
import HeartSvg from "../../../../public/icons/heart-solid.svg"
import KebabSvg from "../../../../public/icons/kebab.svg"
import LightningSvg from "../../../../public/icons/lightning.svg"
import MailSvg from "../../../../public/icons/mail.svg"
import MenuSvg from "../../../../public/icons/menu.svg"
import NoMobileSvg from "../../../../public/icons/noMobile.svg"
import PencilSvg from "../../../../public/icons/pencil.svg"
import ScratchSvg from "../../../../public/icons/scratch.svg"
import ShopSvg from "../../../../public/icons/shop.svg"
import SwordSvg from "../../../../public/icons/sword-solid.svg"
import SwordsSvg from "../../../../public/icons/swords.svg"
import TreasureMapSvg from "../../../../public/icons/treasureMap.svg"
import TrophySvg from "../../../../public/icons/trophy.svg"
import WaterSvg from "../../../../public/icons/water.svg"

import CoinsSvg from "../../../../public/icons/coins.svg"

import iconStyles from "./icon.module.css"

export type IconProps = ComponentPropsWithoutRef<"svg"> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
}

export const createIcon = (SVG: ComponentType<HTMLAttributes<SVGSVGElement>>, label: string) => {
  const iconComponent = forwardRef<SVGSVGElement, IconProps>(({ size = "lg", className, ...props }, ref) => {
    return (
      <SVG
        className={`${className} ${iconStyles.icon}`}
        data-size={size}
        // @ts-ignore
        ref={ref}
        alt={label}
        {...props}
      />
    )
  })
  iconComponent.displayName = label
  return iconComponent
}

export const Air = createIcon(AirSvg, "Air")
export const ArrowLeft = createIcon(ArrowLeftSvg, "Left")
export const ArrowRight = createIcon(ArrowRightSvg, "Right")
export const Check = createIcon(CheckSvg, "Check")
export const Circle = createIcon(CircleSvg, "Circle")
export const Close = createIcon(CloseSvg, "Close")
export const Dice = createIcon(DiceSvg, "Dice")
export const Earth = createIcon(EarthSvg, "Earth")
export const ExternalLink = createIcon(ExternalLinkSvg, "External Link")
export const Fire = createIcon(FireSvg, "Fire")
export const Gear = createIcon(GearSvg, "Gear")
export const Hammer = createIcon(HammerSvg, "Hammer")
export const Heart = createIcon(HeartSvg, "Heart")
export const Kebab = createIcon(KebabSvg, "Kebab")
export const Lightning = createIcon(LightningSvg, "Lightning")
export const Mail = createIcon(MailSvg, "Mail")
export const Menu = createIcon(MenuSvg, "Menu")
export const NoMobile = createIcon(NoMobileSvg, "No Mobile Devices")
export const Pencil = createIcon(PencilSvg, "Pencil")
export const Scratch = createIcon(ScratchSvg, "Scratch")
export const Shop = createIcon(ShopSvg, "Shop")
export const Sword = createIcon(SwordSvg, "Sword")
export const Swords = createIcon(SwordsSvg, "Swords")
export const TreasureMap = createIcon(TreasureMapSvg, "Treasure Map")
export const Trophy = createIcon(TrophySvg, "Trophy")
export const Water = createIcon(WaterSvg, "Water")

export const Coins = createIcon(CoinsSvg, "WaCoinster")
