import { StructuredText } from "react-datocms/structured-text";

export function StructuredTextContent(
  props: React.ComponentPropsWithoutRef<typeof StructuredText>,
) {
  return (
    <div className="prose max-w-full break-words prose-a:text-[#002169] prose-a:transition-colors hover:prose-a:text-[#F5333F]">
      <StructuredText {...props} />
    </div>
  );
}
