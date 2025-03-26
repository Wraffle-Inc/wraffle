import {useState} from 'react';
import {AddItemCard, ImageCardWithDelete} from '@/features/image-handle';
import {useImageUpload} from '@/features/image-handle/api/useImageUpload';
import {Button, Label, Typography} from '@wraffle/ui';

export const ImageStep = ({onNext}: {onNext: (images: string[]) => void}) => {
  const [images, setImages] = useState<string[]>([]);
  const {getImagePresignedUrl, uploadImageToS3} = useImageUpload();

  const handleImageUpload = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    try {
      const file = files[0];
      const fileName = encodeURIComponent(file.name);

      const presignedUrl = await getImagePresignedUrl(fileName);

      await uploadImageToS3(presignedUrl, file);

      const fileUrl = presignedUrl;
      setImages(prev => [...prev, fileUrl].slice(0, 4));
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleImageDelete = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography as='h2' size='h2'>
          이미지가 있으면 좋을거 같아요!
        </Typography>
        <Typography as='p' size='p3' color='zinc400'>
          이미지는 최대 4장까지 추가 가능해요
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography as='h3' size='h3'>
          이미지*
        </Typography>
        <Label className='pb-0.5 text-[0.625rem] font-medium text-zinc-900'>
          최대 4장
        </Label>
      </div>

      <div className='flex flex-wrap gap-4'>
        {images.map((url, index) => (
          <ImageCardWithDelete
            key={url}
            url={url}
            onClick={() => handleImageDelete(index)}
            className='h-40 w-40'
          />
        ))}
        {images.length < 4 && (
          <AddItemCard
            label='이미지 추가'
            onClick={() => {
              // 웹뷰 연결 후 input 파일 변경
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.multiple = false;
              input.onchange = handleImageUpload;
              input.click();
            }}
            className='h-40 w-40'
          />
        )}
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          type='button'
          className='mb-5 mt-3 disabled:text-[#A1A1AA]'
          disabled={images.length === 0}
          onClick={() => onNext(images)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};
