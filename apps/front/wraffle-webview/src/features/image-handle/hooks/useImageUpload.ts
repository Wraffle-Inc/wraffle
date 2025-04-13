import {uploadImage} from '../api/imageUpload';
import {useRef} from 'react';
import type {ChangeEvent} from 'react';

interface UseImageUploadProps {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export const useImageUpload = ({
  onSuccess,
  onError,
}: UseImageUploadProps = {}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedImageUrl = await uploadImage(file);
      onSuccess?.(uploadedImageUrl);
    } catch (error) {
      onError?.(error as Error);
    } finally {
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    handleImageUpload,
    triggerFileInput,
  };
};
