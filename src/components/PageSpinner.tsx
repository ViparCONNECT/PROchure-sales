export default function PageSpinner() {
    return (
        <div className="flex items-center justify-center py-6">
            <div
                className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin"
                style={{ borderTopColor: "var(--color-prochure-bg)" }}
            />
        </div>
    );
}
