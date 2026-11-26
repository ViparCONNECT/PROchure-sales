// profile-kit — shared by PROchure-sales and PROchure.app-admin. Keep both copies identical.
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import "./profile-kit.css";
import { variantLabels } from "./constants";
import { addressLines, formatPhone, workingHoursLines } from "./format";
import type { ProfileCardData } from "./types";

interface ProfileCardProps {
    data: ProfileCardData;
    /** Also render the white details section (contacts, address, hours, languages). */
    showDetails?: boolean;
    /** Show field names in empty slots (form preview / stencil mode). */
    placeholders?: boolean;
    /** Retained for API compatibility; closing is handled by the popup frame. */
    onClose?: () => void;
    /** Optional action inserted between the themed top and the white detail section. */
    actionSlot?: ReactNode;
    /** "light" = white card with theme-colour text (used for listing grids). */
    tone?: "dark" | "light";
    className?: string;
}

/** The PROchure visiting card. The dark top part is always 1.75 : 1. */
export default function ProfileCard({
    data,
    showDetails = false,
    placeholders = false,
    onClose: _onClose,
    actionSlot,
    tone = "dark",
    className,
}: ProfileCardProps) {
    const isBrand = data.profileType === "SERVICE_AND_RETAIL_BRANDS";
    const kind = isBrand ? null : (data.consultantKind ?? "INDEPENDENT");
    const labels = variantLabels(data.profileType, kind);

    const slot = (value: string | null | undefined, label: string, required = true): ReactNode =>
        value?.trim() ? value : placeholders ? <span className="pk-placeholder">{label}{required ? " *" : ""}</span> : null;

    const since = data.sinceYear?.trim()
        ? `${labels.sinceShort} ${data.sinceYear}`
        : placeholders ? <span className="pk-placeholder">{labels.since} *</span> : null;

    const name = slot(data.name, labels.name);
    const services = slot(data.servicesOffered, labels.services);
    const degrees = slot(data.degrees, "Degrees");
    const consultantName = slot(data.consultantName, "Name of consultant", false);
    const regNo = slot(
        data.registrationNumber?.trim() ? `Reg. No. ${data.registrationNumber.trim()}` : null,
        "Statutory body registration number",
        false,
    );

    return (
        <div className={`pk-root pk-card${tone === "light" ? " pk-card-light" : ""} ${className ?? ""}`}>
            <div className="pk-card-top">
                <div className="pk-card-top-inner">
                    <div className="pk-card-head">
                        {data.isWomenEntrepreneur ? (
                            <span className="pk-badge">She-Pro</span>
                        ) : placeholders ? (
                            <span></span>
                        ) : null}
                    </div>

                    <div className="pk-card-main">
                        {kind === "INDEPENDENT" && (
                            <>
                                <div className="pk-left">
                                    <div className="pk-name">{name}</div>
                                    {degrees && <div className="pk-line">{degrees}</div>}
                                    {regNo && <div className="pk-line pk-line-sm">{regNo}</div>}
                                </div>
                                <div className="pk-center pk-services">{services}</div>
                            </>
                        )}

                        {kind === "CONSULTANCY" && (
                            <>
                                <div className="pk-center pk-name">{name}</div>
                                {consultantName && <div className="pk-left pk-line">{consultantName}</div>}
                                <div className="pk-center pk-services">{services}</div>
                            </>
                        )}

                        {isBrand && (
                            <>
                                <div className="pk-center pk-name">{name}</div>
                                <div className="pk-center pk-services">{services}</div>
                            </>
                        )}
                    </div>

                    {since && <div className="pk-since">{since}</div>}
                </div>
            </div>

            {actionSlot && <div className="pk-card-divider">{actionSlot}</div>}
            {showDetails && <CardDetails data={data} placeholders={placeholders} />}
        </div>
    );
}

function CardDetails({
    data,
    placeholders,
}: {
    data: ProfileCardData;
    placeholders: boolean;
}) {
    const phones = (data.contactNumbers ?? []).filter(Boolean);
    const emails = (data.emails ?? []).filter(Boolean);
    const address = addressLines(data.address);
    const hours = workingHoursLines(data.workingHours);
    const languages = (data.languages ?? []).filter(Boolean);
    const empty = placeholders ? <span className="pk-empty">—</span> : null;
    const servicesDetail = data.servicesDetail?.trim();

    return (
        <div className="pk-card-body">
            <Section label="">
                {servicesDetail ? <div style={{ whiteSpace: "pre-line" }}>{servicesDetail}</div> : empty}
            </Section>

            <Section label="">
                <div className="pk-contact-group">
                    <div>
                        {/* <div className="pk-sec-label">Contact number (s)</div> */}
                        {phones.length
                            ? phones.map((p) => (
                                <div key={p} className="pk-sec-label pk-blue">
                                    <a href={`tel:${p}`}>
                                        <Phone className="lucide-icon" />
                                        {formatPhone(p)}
                                    </a>
                                </div>
                            ))
                            : empty}
                    </div>
                    <div className="">
                        {/* <div className="pk-sec-label">{labels.hours}</div> */}
                        {hours.length ? (
                            <div className="pk-detail-row">
                                <Clock3 className="lucide-icon" />
                                <dl className="pk-hours" style={{ margin: 0 }}>
                                    {hours.map((h) => (
                                        <div key={h.label} style={{ display: "contents" }}>
                                            <dt>{h.label}</dt>
                                            <dd>{h.text}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ) : empty}
                    </div>

                </div>
            </Section>
            <Section label="">
                {address.length ? (
                    <div style={{ whiteSpace: "pre-line" }}>
                        <MapPin className="lucide-icon" />
                        {address.join("\n")}
                    </div>
                ) : empty}
            </Section>

            <Section label="">
                <>
                    {emails.length
                        ? emails.map((email) => (
                            <div key={email} className="pk-sec-label-lower pk-blue">
                                <a href={`mailto:${email}`}>
                                    <Mail className="lucide-icon" />
                                    {email}
                                </a>
                            </div>
                        ))
                        : empty}
                    <div className="pk-sec-label mt-10">Preferred Languages for Communication</div>
                    {languages.length ? languages.join(", ") : empty}
                </>
            </Section>
        </div>
    );
}

function Section({ label, blue, children }: { label: string; blue?: boolean; children: ReactNode }) {
    if (children === null || children === undefined) return null;

    const sectionRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const value = valueRef.current;
        if (!section || !value) return;

        const measure = () => {
            if (expanded) {
                setHasOverflow(value.scrollHeight > section.clientHeight);
                return;
            }
            const labelHeight = 24;
            const availableHeight = section.clientHeight - 12 - labelHeight;
            console.log("Section measure", { label, availableHeight, scrollHeight: value.scrollHeight });
            setHasOverflow(value.scrollHeight > availableHeight);
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(section);
        observer.observe(value);
        return () => observer.disconnect();
    }, [children, expanded]);

    return (
        <div
            ref={sectionRef}
            className={`pk-card-section${expanded ? " pk-card-section-expanded" : ""}`}
        >
            <div className={`pk-sec-label${blue ? " pk-blue" : ""}`}>{label}</div>
            <div ref={valueRef} className="pk-sec-value">{children}</div>
            {hasOverflow && (
                <button
                    type="button"
                    className="pk-see-more"
                    onClick={() => setExpanded((current) => !current)}
                    aria-expanded={expanded}
                >
                    {expanded ? "Show Less" : "See More..."}
                </button>
            )}
        </div>
    );
}
