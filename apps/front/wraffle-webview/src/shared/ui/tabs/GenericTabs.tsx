import {ChipButtons} from '../ChipButtons/ChipButtons';
import {Tabs, TabsContent, TabsList, TabsTrigger} from './core/Tabs';
import type {ReactNode} from 'react';
import {findComponentFromChildren} from '@wraffle/ui';

interface GenericTabsProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  category: string;
  setCategory: (category: string) => void;
  chipList: string[];
}

export const GenericTabs = ({
  children,
  activeTab,
  setActiveTab,
  category,
  setCategory,
  chipList,
}: GenericTabsProps) => {
  const raffleChildren = findComponentFromChildren(children, Raffle);
  const eventChildren = findComponentFromChildren(children, Event);
  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value: string) => setActiveTab(value)}
    >
      <TabsList>
        <TabsTrigger value='raffle'>래플</TabsTrigger>
        <TabsTrigger value='event'>이벤트</TabsTrigger>
      </TabsList>

      <ChipButtons
        chipList={chipList}
        category={category}
        setCategory={setCategory}
        className='mb-1 mt-5 flex gap-2 overflow-x-scroll pl-0.5'
      />

      <TabsContent value='raffle'>{raffleChildren}</TabsContent>

      <TabsContent value='event'>{eventChildren}</TabsContent>
    </Tabs>
  );
};

interface WithChildren {
  children: ReactNode;
}

const Raffle = ({children}: WithChildren) => <>{children}</>;

const Event = ({children}: WithChildren) => <>{children}</>;

GenericTabs.Raffle = Raffle;
GenericTabs.Event = Event;
