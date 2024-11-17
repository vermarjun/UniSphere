import styled from "styled-components";

const Rfsb = styled.div.attrs({
  className: "w-1/4 h-full bg-black text-white overflow-y-auto fixed right-0 border-l-2 border-gray-500 p-3", // Fixed to the right
})``;

const SectionBox = styled.div.attrs({
  className: "border-2 border-gray-700 rounded-2xl p-4 space-y-4",
})``;

const SectionItem = styled.div.attrs({
  className:
    "space-y-1 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all",
})``;

const ShowMore = styled.div.attrs({
  className:
    "text-blue-400 text-sm font-semibold hover:underline cursor-pointer mt-3",
})``;

export default function Rightsidebar() {
  const trendingTopics = [
    {
      category: "Entertainment · Trending",
      title: "#CharacterlessLadyNAYANTHARA",
      subtext: "Trending with #DhanushVsNayanthara",
    },
    {
      category: "Entertainment · Trending",
      title: "#Pushpa2TheRuleTrailer",
      subtext: "Trending with #AlluArjunInPatna",
    },
    {
      category: "Celebrity · Trending",
      title: "स्वरा भास्कर",
      subtext: "6,036 posts",
    },
    {
      category: "Trending in India",
      title: "#Jyothika",
      subtext: "3,987 posts",
    },
    {
      category: "Trending in India",
      title: "याकूब मेनसूरी",
      subtext: "2,905 posts",
    },
  ];

  const auraTopics = [
    {
      category: "Community · Suggested",
      title: "#Mindfulness",
      subtext: "3,456 discussions",
    },
    {
      category: "Learning · Popular",
      title: "#AIAdvancements",
      subtext: "2,800 posts",
    },
    {
      category: "Technology · Trending",
      title: "#OpenSource",
      subtext: "1,764 discussions",
    },
    {
      category: "Health · Discussions",
      title: "#FitnessGoals",
      subtext: "5,020 posts",
    },
    {
      category: "Travel · Trending",
      title: "#ExploreNature",
      subtext: "1,234 mentions",
    },
  ];

  return (
    <Rfsb>
      <div className="p-4 h-full space-y-6">
        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white placeholder-gray-400 rounded-full p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Trending Section */}
        <SectionBox>
          <p className="text-white text-xl font-bold ">What's happening</p>
          {trendingTopics.map((topic, index) => (
            <SectionItem key={index}>
              <p className="text-gray-400 text-sm">{topic.category}</p>
              <p className="text-blue-400 font-bold">{topic.title}</p>
              <p className="text-gray-500 text-sm">{topic.subtext}</p>
            </SectionItem>
          ))}
          <ShowMore>Show more</ShowMore>
        </SectionBox>

        {/* Aura Section */}
        <SectionBox>
          <p className="text-white text-xl font-bold">Aura</p>
          {auraTopics.map((topic, index) => (
            <SectionItem key={index}>
              <p className="text-gray-400 text-sm">{topic.category}</p>
              <p className="text-blue-400 font-bold">{topic.title}</p>
              <p className="text-gray-500 text-sm">{topic.subtext}</p>
            </SectionItem>
          ))}
          <ShowMore>Explore more</ShowMore>
        </SectionBox>
      </div>
    </Rfsb>
  );
}
