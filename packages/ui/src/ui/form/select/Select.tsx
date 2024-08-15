import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "./PrimitiveSelect";

export interface SelectItem {
  value: string;
  name: string;
}

export interface GroupSelectItem {
  groupName: string;
  groupItems: SelectItem[];
}

export interface BaseSelectProps {
  placeholder: string;
}

export interface GroupSelectProps extends BaseSelectProps {
  items: GroupSelectItem[];
}

export interface SimpleSelectProps extends BaseSelectProps {
  items: SelectItem[];
}

export type SelectProps = GroupSelectProps | SimpleSelectProps;

const isGroupSelect = (
  items: SelectItem[] | GroupSelectItem[]
): items is GroupSelectItem[] => {
  return (items as GroupSelectItem[])[0]?.groupName !== undefined;
};

const Select = ({ placeholder, items }: SelectProps) => {
  return (
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {isGroupSelect(items) &&
          items.map((group) => (
            <SelectGroup key={group.groupName}>
              <SelectLabel>{group.groupName}</SelectLabel>
              {group.groupItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        {!isGroupSelect(items) &&
          items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </SelectRoot>
  );
};

export { Select };
