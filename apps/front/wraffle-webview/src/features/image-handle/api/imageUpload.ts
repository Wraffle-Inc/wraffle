import {v4 as uuidv4} from 'uuid';
import apiClient from '@/shared/api/apiClient';

interface PresignedUrlResponse {
  presignedUrls: string[];
}

interface UploadRequest {
  fileKeys: string[];
}
export const uploadImage = async (images: File[]) => {
  const fileKeys = images.map(image => {
    const fileExtension = image.name.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const fileName = encodeURIComponent(uniqueFileName);
    return fileName;
  });

  const response = await apiClient.post<PresignedUrlResponse, UploadRequest>(
    '/files/upload',
    {
      body: {fileKeys},
      withAuth: true,
    },
  );

  const presignedUrls = response.data.presignedUrls;
  const uploadPromises = images.map((image, index) =>
    uploadImageToS3(presignedUrls[index], image),
  );
  await Promise.all(uploadPromises);

  const publicUrls = fileKeys.map(fileKey => {
    return `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileKey}`;
  });

  return publicUrls;
};

const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  return await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
};
