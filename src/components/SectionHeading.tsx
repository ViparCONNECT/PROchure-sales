
interface SectionHeadingProps {
  icon: any;
  title: string;
}

export default function SectionHeading({
  icon: Icon,
  title,
}: SectionHeadingProps) {
  return (
    <div
      className="mb-12 sm:mb-16"
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <div
          className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-prochure-bg flex items-center justify-center shadow-lg shadow-prochure-bg/40"
        >
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>

        <div className="flex-1 pt-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            {title}
          </h2>
          <div
            className="h-1.5 bg-gradient-to-r from-prochure-bg/60 to-transparent mt-4 rounded-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
