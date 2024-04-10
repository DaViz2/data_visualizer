import Blueprint from '../blueprint/blueprint';
import TabComponent from '../tab/tab';

export default function Userarea() {
  const tabs = [
    {
      title: 'Code Area',
      content: (
        <div className="h-full w-full bg-[#7D0000]">Content for Tab 1</div>
      ),
    },
    { title: 'Blue Print', content: <Blueprint /> },
  ];

  return (
    <div className="flex w-full h-full">
      <TabComponent tabs={tabs} />
    </div>
  );
}
