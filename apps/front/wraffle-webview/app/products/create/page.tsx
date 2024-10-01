'use client';

import {Header, ProgressBar} from '@/shared/ui';
import {
  DateStep,
  ImageStep,
  NoteStep,
  TitleStep,
} from '@/widgets/product-list/ui';
import {useFunnel} from '@use-funnel/browser';

interface TitleStepProps {
  title?: string;
  category?: string;
  tags?: string[];
  entries?: string;
  entryStartDate?: Date | undefined;
  entryDeadLine?: Date | undefined;
  winnerAnnouncementDate?: Date | undefined;
  images?: string[];
  notes?: string;
}

interface DateStepProps {
  title: string;
  category: string;
  tags: string[];
  entries: string;
  entryStartDate?: Date | undefined;
  entryDeadLine?: Date | undefined;
  winnerAnnouncementDate?: Date | undefined;
  images?: string[];
  notes?: string;
}

interface ImageStepProps {
  title: string;
  category: string;
  tags: string[];
  entries: string;
  entryStartDate: Date | undefined;
  entryDeadLine: Date | undefined;
  winnerAnnouncementDate: Date | undefined;
  images?: string[];
  notes?: string;
}

export interface NoteStepProps {
  title: string;
  category: string;
  tags: string[];
  entries: string;
  entryStartDate: Date | undefined;
  entryDeadLine: Date | undefined;
  winnerAnnouncementDate: Date | undefined;
  images: string[];
  notes?: string;
}

const CreatePage = () => {
  const funnel = useFunnel<{
    titleStep: TitleStepProps;
    dateStep: DateStepProps;
    imageStep: ImageStepProps;
    noteStep: NoteStepProps;
  }>({
    id: '',
    initial: {
      step: 'titleStep',
      context: {},
    },
  });

  console.log(funnel.context);

  return (
    <div>
      <div className='py-5'>
        <Header>
          <Header.BackButton onClick={() => funnel.history.back()} />
        </Header>
        <ProgressBar totalSteps={4} index={funnel.index} />
      </div>

      <funnel.Render
        titleStep={({history}) => (
          <TitleStep
            onNext={(title, category, tags, entries) =>
              history.push('dateStep', {title, category, tags, entries})
            }
          />
        )}
        dateStep={({history}) => (
          <DateStep
            onNext={(entryStartDate, entryDeadLine, winnerAnnouncementDate) =>
              history.push('imageStep', {
                entryStartDate,
                entryDeadLine,
                winnerAnnouncementDate,
              })
            }
          />
        )}
        imageStep={({history}) => (
          <ImageStep onNext={images => history.push('noteStep', {images})} />
        )}
        noteStep={({context}) => <NoteStep context={context} />}
      />
    </div>
  );
};

export default CreatePage;
