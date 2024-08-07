import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/shared/radix";

interface SelectItem {
  value: string;
  name: string;
}

interface GroupSelectItem {
  groupName: string;
  groupItems: SelectItem[];
}

interface BaseSelectProps {
  placeholder: string;
}

interface GroupSelectProps extends BaseSelectProps {
  items: GroupSelectItem[];
}

interface SimpleSelectProps extends BaseSelectProps {
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
        {isGroupSelect(items)
          ? items.map((group) => (
              <SelectGroup key={group.groupName}>
                <SelectLabel>{group.groupName}</SelectLabel>
                {group.groupItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          : items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
      </SelectContent>
    </SelectRoot>
  );
};

export { Select };
