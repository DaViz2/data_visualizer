import TabComponent from "./tab";

export default function Userarea() {
  const tabs = [
    { title: 'Code Area', content: <div>Content for Tab 1</div> },
    { title: 'Blue Print', content: <div>Content for Tab 2</div> },
  ];

  return (
    <div className="flex w-full h-full">
      <TabComponent tabs={tabs} />
    </div>
  );
}
