import React from "react";

const svgProps = {
  className: "size-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export type DirhamIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

export function DirhamIcon({ title, className, ...props }: DirhamIconProps) {
  const ariaHidden = title ? undefined : true;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={ariaHidden}
      className={["inline-block align-[-0.125em]", className].filter(Boolean).join(" ")}
      {...props}
    >
      {title ? <title>{title}</title> : null}

      <path d="M8 4v16" />
      <path d="M8 4h5.5a5.5 5.5 0 0 1 0 16H8" />
      <path d="M6 9.5h9" />
      <path d="M6 14.5h9" />
    </svg>
  );
}

type InlineIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

function getAriaProps(title?: string) {
  return {
    role: title ? ("img" as const) : undefined,
    "aria-hidden": title ? undefined : true,
  };
}

export function BedIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 14h20M10 8v6" />
    </svg>
  );
}

export function BathIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="3" y1="13" x2="21" y2="13" />
    </svg>
  );
}

export function AreaIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  );
}

export function LocationIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PhotosIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

export function CallIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export function EmailIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function WhatsAppIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ChevronRightIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ChevronLeftIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

/** Horizontal “view all” arrow; override `width` / `height` / `strokeWidth` per layout. */
export function ArrowRightIcon({ title, className, width = "16", height = "16", strokeWidth = 1.5, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/** Tiny X for tag chips (hero + property search); same viewBox, size via width/height. */
export function ChipCloseIcon({ title, width = "8", height = "8", ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width={width} height={height} viewBox="0 0 8 8" fill="none" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function HeroSearchIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function HeroChevronDownIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToolbarDropdownChevronIcon({ title, open, className, ...props }: InlineIconProps & { open: boolean }) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      className={["size-4 shrink-0 transition-transform duration-200", open ? "rotate-180" : "", className].filter(Boolean).join(" ")}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ToolbarSearchIcon({ title, className, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg className={["size-5 shrink-0", className].filter(Boolean).join(" ")} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function FilterFunnelIcon({ title, className, active, ...props }: InlineIconProps & { active?: boolean }) {
  void active;
  const ariaProps = getAriaProps(title);
  return (
    <svg className={["size-5 shrink-0", className].filter(Boolean).join(" ")} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
  );
}

export function ModalCloseIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TeamSearchIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function SelectChevronDownIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function AccordionChevronIcon({ title, open, className, ...props }: InlineIconProps & { open: boolean }) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[`transition-transform duration-300 shrink-0`, open ? "rotate-180" : "", className].filter(Boolean).join(" ")}
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ListingCardMapPinIcon({ title, className, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg className={["size-4 shrink-0", className].filter(Boolean).join(" ")} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export function ListingCardPhoneIcon({ title, className, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg className={["size-4 shrink-0", className].filter(Boolean).join(" ")} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

export function OffPlanBedIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M2 9V19M22 9V19M2 19H22M2 9H22M2 9C2 9 2 5 7 5H17C22 5 22 9 22 9" />
      <path d="M12 5V9" />
    </svg>
  );
}

export function OffPlanBathIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M4 12H20V17C20 19.2 18.2 21 16 21H8C5.8 21 4 19.2 4 17V12Z" />
      <path d="M4 12V5C4 3.9 4.9 3 6 3H8C9.1 3 10 3.9 10 5V12" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function OffPlanPropertySizeIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3V21M3 9H9" />
    </svg>
  );
}

export function DownloadArrowIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

export function OffPlanCarouselChevronLeftIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function OffPlanCarouselChevronRightIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function LayoutGridIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

export function MapPinFilledIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

export function SellTrustPriceTagIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M20.59 13.41 11 23H2v-9l9.59-9.59a2 2 0 0 1 2.82 0l6.18 6.18a2 2 0 0 1 0 2.82Z" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <path d="M16 7v6" />
      <path d="M13 10h6" />
    </svg>
  );
}

export function SellTrustSparkIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

export function SellTrustShieldIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="M9.5 12.5 11 14l3.5-4" />
    </svg>
  );
}

export function SellTrustClockIcon({ title, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M18.5 5.5a10 10 0 0 1 0 13" />
      <path d="M21 10v4h-4" />
      <path d="M5.5 18.5a10 10 0 0 1 0-13" />
      <path d="M3 14v-4h4" />
    </svg>
  );
}

export function ShareNetworkIcon({ title, className, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={["cursor-pointer", className].filter(Boolean).join(" ")} {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M15 6.5L8.5 10.25M8.5 13.75L15 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="6.5" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function BlockQuoteIcon({ title, className, ...props }: InlineIconProps) {
  const ariaProps = getAriaProps(title);
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={["text-(--charcoal)/15 shrink-0", className].filter(Boolean).join(" ")} {...ariaProps} {...props}>
      {title ? <title>{title}</title> : null}
      <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" fill="currentColor" />
    </svg>
  );
}

export const serviceIcons: Record<string, React.ReactNode> = {
  "property-management": (
    <svg {...svgProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "professional-inspection": (
    <svg {...svgProps}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  brokerage: (
    <svg {...svgProps}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  mortgage: (
    <svg {...svgProps}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  "property-listing-marketing": (
    <svg {...svgProps}>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.2-2.4" />
    </svg>
  ),
  "after-sales-support": (
    <svg {...svgProps}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),

  // Subservice icons
  "tenant-selection": (
    <svg {...svgProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3.99-3.98" />
      <path d="M16 11a4 4 0 1 0 0-8" />
    </svg>
  ),
  "rent-financial": (
    <svg {...svgProps}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
  ),
  "maintenance-repairs": (
    <svg {...svgProps}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "periodic-inspections": (
    <svg {...svgProps}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  "legal-compliance": (
    <svg {...svgProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "end-tenancy": (
    <svg {...svgProps}>
      <path d="m15 11 3 3-3 3" />
      <path d="M8 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3" />
      <path d="m12 4 5 5 5-5" />
      <path d="M17 4v12" />
    </svg>
  ),
  "transparent-reporting": (
    <svg {...svgProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  ),
  "detailed-inspection": (
    <svg {...svgProps}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  "inspection-report": (
    <svg {...svgProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h2" />
      <path d="M8 17h8" />
    </svg>
  ),
  "follow-up-coordination": (
    <svg {...svgProps}>
      <path d="m3 12 4 4 8-8" />
      <path d="M7 16v4h14" />
    </svg>
  ),
  "post-verification": (
    <svg {...svgProps}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  "tailored-snagging": (
    <svg {...svgProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "understanding-vision": (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  "smart-matching": (
    <svg {...svgProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3.99-3.98" />
      <path d="M16 11a4 4 0 1 0 0-8" />
      <path d="m16 16 2 2 4-4" />
    </svg>
  ),
  "negotiation": (
    <svg {...svgProps}>
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5" />
    </svg>
  ),
  "end-to-end-management": (
    <svg {...svgProps}>
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15" />
    </svg>
  ),
  "pre-approval": (
    <svg {...svgProps}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  ),
  "bank-comparison": (
    <svg {...svgProps}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  "loan-approval": (
    <svg {...svgProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l2 2 4-4" />
    </svg>
  ),
  "expat-mortgages": (
    <svg {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  "financial-guidance": (
    <svg {...svgProps}>
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  "post-approval": (
    <svg {...svgProps}>
      <rect width="20" height="14" x="2" y="6" rx="2" />
      <path d="M2 10h20" />
      <path d="M12 18v-6" />
    </svg>
  ),
  "exposure-portals": (
    <svg {...svgProps}>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </svg>
  ),
  "social-media": (
    <svg {...svgProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  "visual-marketing": (
    <svg {...svgProps}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  "seo-listing": (
    <svg {...svgProps}>
      <path d="M10 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M10 2v6h6" />
      <path d="M8 11h4M8 15h2" />
      <circle cx="15" cy="15" r="4" />
      <path d="m18.5 18.5 2 2" />
    </svg>
  ),
  "market-pricing": (
    <svg {...svgProps}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    </svg>
  ),
  "client-network": (
    <svg {...svgProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3.99-3.98" />
      <path d="M16 11a4 4 0 1 0 0-8" />
    </svg>
  ),
  "title-deed": (
    <svg {...svgProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  ),
  "utility-connection": (
    <svg {...svgProps}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "handover-inspection": (
    <svg {...svgProps}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  "fit-outs": (
    <svg {...svgProps}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  "resale": (
    <svg {...svgProps}>
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  ),
};
