import apiClient from '@/shared/api/apiClient';

interface PresignedUrlResponse {
  presignedUrls: string[];
}

interface UploadRequest {
  fileKeys: string[];
}

export const uploadImage = async (file: File): Promise<string> => {
  const fileName = encodeURIComponent(file.name);
  const response = await apiClient.post<PresignedUrlResponse, UploadRequest>(
    '/files/upload',
    {body: {fileKeys: [fileName]}, withAuth: true},
  );

  const presignedUrl = response.data.presignedUrls[0];
  const contentType = file.type || 'image/jpeg';

  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000',
    },
  });

  return presignedUrl;
};
