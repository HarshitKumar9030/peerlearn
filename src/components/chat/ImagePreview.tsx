"use client";

export default function ImagePreview({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative mb-4">
      <img
        src={src}
        alt="Preview"
        className="w-full h-40 object-cover rounded-lg shadow-md"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-xl hover:bg-red-700 transition"
      >
        ✕
      </button>
    </div>
  );
}
