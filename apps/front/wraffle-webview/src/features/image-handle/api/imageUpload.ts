import {v4 as uuidv4} from 'uuid';
import apiClient from '@/shared/api/apiClient';

interface PresignedUrlResponse {
  presignedUrls: string[];
}

interface UploadRequest {
  fileKeys: string[];
}

export const uploadImage = async (file: File): Promise<string> => {
  const fileExtension = file.name.split('.').pop();
  const uniqueFileName = `${uuidv4()}.${fileExtension}`;
  const fileName = encodeURIComponent(uniqueFileName);

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

  const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileName}`;

  return publicUrl;
};
