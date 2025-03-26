import apiClient from '@/shared/api/apiClient';

interface PresignedUrlResponse {
  presignedUrls: string[];
}

interface UploadRequest {
  fileKeys: string[];
}

export const useImageUpload = () => {
  const getImagePresignedUrl = async (fileName: string) => {
    const response = await apiClient.post<PresignedUrlResponse, UploadRequest>(
      '/files/upload',
      {body: {fileKeys: [fileName]}, withAuth: true},
    );
    return response.data.presignedUrls[0];
  };

  const uploadImageToS3 = async (
    presignedUrl: string,
    file: File,
  ): Promise<void> => {
    const contentType = file.type || 'image/jpeg';

    await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  };

  return {
    getImagePresignedUrl,
    uploadImageToS3,
  };
};
