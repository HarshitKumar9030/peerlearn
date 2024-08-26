"use client";

import { useState, ChangeEvent } from "react";
import { FileImage, SendHorizontalIcon, X } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { motion, AnimatePresence } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (message: string, image: string | null) => void;
  replyingTo: string | null;
  onCancelReply: () => void;
}

export default function MessageInput({
  onSendMessage,
  replyingTo,
  onCancelReply,
}: MessageInputProps) {
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showImagePopup, setShowImagePopup] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setShowImagePopup(false);
    }
  };

  const handleSubmit = () => {
    if (!message && !image && !imageUrl) return;
    onSendMessage(message, image || imageUrl);
    setMessage("");
    setImage(null);
    setImageUrl("");
  };

  return (
    <div className="flex flex-col p-4 relative">
      {replyingTo && (
        <div className="py-4 px-2 bg-neutral-200 dark:bg-neutral-700 text-sm rounded-lg mb-2 flex justify-between items-center">
          <span>Replying to: {replyingTo}</span>
          <button
            onClick={onCancelReply}
            className="ml-2 duration-300 px-3 py-2 rounded-xl bg-red-500 hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      )}

      {image && <ImagePreview src={image} onRemove={() => setImage(null)} />}
      {imageUrl && <ImagePreview src={imageUrl} onRemove={() => setImageUrl("")} />}

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="flex items-center md:space-x-3 border border-neutral-300 dark:border-neutral-700 rounded-full bg-white dark:bg-neutral-800 px-4 py-2 shadow-sm">
        <label className="relative cursor-pointer text-neutral-700 dark:text-neutral-300">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <FileImage
            size={24}
            className="hover:text-neutral-700 ml-2 dark:hover:text-neutral-300"
            onClick={() => setShowImagePopup(!showImagePopup)}
          />

          {/* Image Upload Popup */}
          <AnimatePresence>
            {showImagePopup && (
              <motion.div
                className="absolute top-[-160px] left-[-20px] w-[220px] bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-4 z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex flex-col space-y-2">
                  <button className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700">
                    <label className="cursor-pointer">
                      Upload from device
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </button>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                    />
                  </div>
                  <button
                    className="absolute top-1 right-1 text-red-500 hover:text-red-700"
                    onClick={() => setShowImagePopup(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </label>

        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded-full outline-none bg-transparent text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
        />
        <button
          className={`flex items-center absolute right-[3.25rem] duration-300 transition-all justify-center text-neutral-700 dark:text-neutral-300 ${
            message || image || imageUrl
              ? "bg-purple-600 text-white hover:bg-purple-800"
              : "dark:bg-neutral-700 bg-neutral-200 cursor-not-allowed"
          } py-3 px-3 rounded-2xl`}
          onClick={handleSubmit}
          disabled={!message && !image && !imageUrl}
        >
          <SendHorizontalIcon size={20} />
        </button>
      </div>
    </div>
  );
}
