import type {NoteStepProps} from 'app/products/create/page';
import {useState} from 'react';
import {
  Button,
  CalendarForm,
  Icon,
  Input,
  InputField,
  Label,
  Select,
  Tag,
  Typography,
} from '@wraffle/ui';

export const TitleStep = ({
  onNext,
}: {
  onNext: (
    title: string,
    category: string,
    tags: string[],
    entries: string,
  ) => void;
}) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [entries, setEntries] = useState<string>('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && tag.trim() !== '') {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // TODO
  // disabled : button은 클릭 가능하게 하고, 클릭했을 때 빈값이면 에러메시지 뜨게 하는 방식?

  // feature폴더구조 분리
  // entities 분리?

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          래플을 생성해볼까요?
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          기본 정보를 입력해주세요.
        </Typography>
      </div>

      <InputField>
        <InputField.Label htmlFor='title' className='text-xl font-bold'>
          제목*
        </InputField.Label>
        <InputField.Input
          id='title'
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='래플 제목을 입력해주세요'
        />
        <InputField.ErrorMessage className='mt-1' isError={false}>
          제목을 입력해주세요
        </InputField.ErrorMessage>
      </InputField>

      <div className='mb-5'>
        <Label className='text-xl font-bold'>카테고리*</Label>
        <Select
          placeholder='카테고리를 선택해주세요.'
          items={[
            {
              value: '생활',
              name: '생활',
            },
            {
              value: '가전-디지탈',
              name: '가전-디지탈',
            },
            {
              value: '행사',
              name: '행사',
            },
            {
              value: '당일마감',
              name: '당일마감',
            },
          ]}
          onChange={value => setCategory(value)}
        />
      </div>

      <div className='mb-5 flex flex-col'>
        <Label className='text-xl font-bold'>태그</Label>
        <div className='mb-2 flex gap-1.5'>
          {tags.map((tag, index) => (
            <Tag handleRemoveTag={handleRemoveTag} key={index}>
              {tag}
            </Tag>
          ))}
        </div>
        <div className='relative'>
          <Input
            className='pr-10'
            placeholder='태그명을 입력해주세요.'
            value={tag}
            onChange={e => setTag(e.target.value)}
            onKeyDown={handleAddTag}
          />
          <div className='absolute inset-y-3 right-0 flex items-center pr-4'>
            <Icon name='search' />
          </div>
        </div>
      </div>

      <InputField>
        <InputField.Label className='text-xl font-bold'>
          응모 금액*
        </InputField.Label>
        <div className='relative w-full'>
          <InputField.Input
            className='pr-10'
            id='entries'
            type='number'
            value={entries}
            onChange={e => setEntries(e.target.value)}
            placeholder='응모 금액을 입력해주세요.'
          />
          <div className='absolute inset-y-3 right-0 flex items-center pr-4'>
            <span className='text-xl font-bold text-zinc-900'>원</span>
          </div>
        </div>

        <InputField.ErrorMessage className='mb-5 mt-1' isError={false}>
          응모 금액을 입력해주세요
        </InputField.ErrorMessage>
      </InputField>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          className='mb-5 mt-3'
          onClick={() => onNext(title, category, tags, entries)}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export const DateStep = ({
  onNext,
}: {
  onNext: (
    entryStartDate: Date | undefined,
    entryDeadLine: Date | undefined,
    winnerAnnouncementDate: Date | undefined,
  ) => void;
}) => {
  const [entryStartDate, setEntryStartDate] = useState<Date | undefined>();
  const [entryDeadLine, setEntryDeadLine] = useState<Date | undefined>();
  const [winnerAnnouncementDate, setWinnerAnnouncementDate] = useState<
    Date | undefined
  >();

  // TODO
  // 당첨자 발표 일정 응모 마감 일정 이후부터 선택 가능
  return (
    <div className='flex h-full flex-col gap-5 px-5 pb-20'>
      <div className=''>
        <Typography className='text-2xl font-bold'>
          래플 일정은 어떻게 되나요?
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          상세 일정을 입력해주세요.
        </Typography>
      </div>

      <div>
        <Typography className='text-xl font-bold'>응모 기간*</Typography>
        <CalendarForm
          formLabel='응모 시작 일정*'
          className='text-base'
          dateLabel='응모 시작 시간을 입력해주세요.'
          selected={entryStartDate}
          setSelected={setEntryStartDate}
        />
        <div className='h-2.5'></div>
        <CalendarForm
          formLabel='응모 마감 일정*'
          className='text-base'
          dateLabel='응모 마감 시간을 입력해주세요.'
          selected={entryDeadLine}
          setSelected={setEntryDeadLine}
        />
      </div>

      <CalendarForm
        formLabel='당첨자 발표 일정*'
        className='text-xl font-bold'
        dateLabel='당첨자 발표 시간을 입력해주세요.'
        selected={winnerAnnouncementDate}
        setSelected={setWinnerAnnouncementDate}
      />

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button
          className='mb-5 mt-3'
          onClick={() =>
            onNext(entryStartDate, entryDeadLine, winnerAnnouncementDate)
          }
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export const ImageStep = ({onNext}: {onNext: (images: string[]) => void}) => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          이미지가 있으면 좋을거 같아요!
        </Typography>
        <Typography className='text-sm font-medium text-[#ADB5BD]'>
          이미지는 최대 4장까지 추가 가능해요
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography className='text-xl font-bold text-zinc-900'>
          이미지*
        </Typography>
        <Label className='pb-0.5 text-[0.625rem] font-medium text-zinc-900'>
          최대 4장
        </Label>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex h-40 w-40 items-center justify-center rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB]'>
          <span className='text-center text-sm font-medium text-[#ADB5BD]'>
            이미지 추가
          </span>
        </div>
      </div>

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button className='mb-5 mt-3' onClick={() => onNext(images)}>
          다음
        </Button>
      </div>
    </div>
  );
};

export const NoteStep = ({context}: {context: NoteStepProps}) => {
  const [note, setNote] = useState<string>('');

  return (
    <div className='flex h-full flex-col px-5 pb-20'>
      <div className='mb-5'>
        <Typography className='text-2xl font-bold'>
          마지막으로 유의사항 한마디.
        </Typography>
        <Typography className='text-sm font-medium text-[#c1c2c3]'>
          유의사항은 400자까지 작성이 가능해요!
        </Typography>
      </div>

      <div className='mb-4 flex items-end'>
        <Typography className='text-xl font-bold text-zinc-900'>
          유의사항*
        </Typography>
        <Label className='pb-0.5 text-[0.625rem] font-medium text-zinc-900'>
          최대 400자
        </Label>
      </div>

      <textarea
        className='resize-none rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB] p-3 text-sm font-medium placeholder:text-[#ADB5BD]'
        value={note}
        rows={7}
        onChange={e => setNote(e.target.value)}
        maxLength={400}
        placeholder='유의사항을 작성해주세요'
      />

      <div className='fixed inset-x-0 bottom-0 bg-white px-4'>
        <Button className='mb-5 mt-3'>생성 요청하기</Button>
      </div>
    </div>
  );
};
