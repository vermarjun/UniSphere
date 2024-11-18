import styled from "styled-components";

// Styled Components for Sidebar
const Rfsb = styled.div.attrs({
  className: "w-full md:w-1/3 h-full bg-gray-900 text-white overflow-y-auto fixed right-0 border-l-2 border-gray-500 p-4",
})``;

const SectionBox = styled.div.attrs({
  className: "border-2 border-gray-700 rounded-2xl p-4 md:p-6 space-y-4 w-full overflow-hidden bg-gray-800", // Dark background for section
})``;

const SectionItem = styled.div.attrs({
  className: "hover:bg-gray-700 p-4 rounded-lg cursor-pointer transition-all grid gap-4 md:gap-6", // Lighter hover effect
})``;

const GridWrapper = styled.div.attrs({
  className: "grid grid-cols-1 md:grid-cols-12 gap-4", // Grid for desktop
})``;

const UserInfo = styled.div.attrs({
  className: "flex items-center space-x-4 md:col-span-3", // 1st column: Image
})``;

const ProfileImage = styled.div.attrs({
  className: "w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-500 flex items-center justify-center overflow-hidden", // Profile image responsive
})``;

const UserName = styled.div.attrs({
  className: "md:col-span-6 flex items-center font-semibold text-white", // 2nd column: UserName
})``;

const PostTime = styled.div.attrs({
  className: "text-sm text-gray-400 md:col-span-3 flex items-center justify-end", // 3rd column: Post time
})``;

const Content = styled.div.attrs({
  className: "space-y-2", // Content spacing
})``;

const ShowMore = styled.div.attrs({
  className: "text-blue-500 text-sm font-semibold hover:underline cursor-pointer mt-4", // Lighter blue for show more
})``;

// Styled Components for Leaderboard
const LeaderboardWrapper = styled.div.attrs({
  className: "border-t-2 border-gray-700 mt-8 pt-4 bg-gray-800", // Dark background for leaderboard
})``;

const TopThreeWrapper = styled.div.attrs({
  className: "flex justify-between space-x-4 mb-8",
})``;

const TopCard = styled.div.attrs({
  className: "flex-1 flex flex-col items-center bg-gray-700 p-4 rounded-lg", // Darker background for top card
})``;

const ParticipantImage = styled.div.attrs({
  className: "w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-500 overflow-hidden",
})``;

const RankBox = styled.div.attrs({
  className: "bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full -mt-6", // Bright gradient for rank box
})``;

const LeaderboardList = styled.div.attrs({
  className: "space-y-4",
})``;

const LeaderboardRow = styled.div.attrs({
  className: "flex items-center justify-between bg-gray-700 p-4 rounded-lg",
})``;

const ParticipantDetails = styled.div.attrs({
  className: "flex-1 ml-4",
})``;

const ParticipantRank = styled.div.attrs({
  className: "text-blue-400 font-bold", // Blue for rank
})``;

// Data for Trending Topics
const trendingTopics = [
  {
    category: "Entertainment · Trending",
    title: "#CharacterlessLadyNAYANTHARA",
    subtext: "Trending with #DhanushVsNayanthara",
    postedBy: "Bharat",
    postedAt: "2 hours ago",
    caption: "Characterless Lady NAYANTHARA trending all over social media today!",
    image: "https://i.pinimg.com/736x/0e/50/fa/0e50fa227d634b7c0825f8b68d56f85c.jpg",
  },
  {
    category: "Entertainment · Trending",
    title: "#Pushpa2TheRuleTrailer",
    subtext: "Trending with #AlluArjunInPatna",
    postedBy: "Arjun",
    postedAt: "1 day ago",
    caption: "Pushpa 2 trailer released, the excitement is real!",
    image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2023/04/Pushpa-2-%E2%80%93-The-Rule.jpg",
  },
];

// Data for Leaderboard
const topThree = [
  { name: "Yash Desai", points: "314,109", rank: 1, image: "https://via.placeholder.com/100?text=Y1" },
  { name: "Yash Parte", points: "283,954", rank: 2, image: "https://via.placeholder.com/100?text=Y2" },
  { name: "Sidharth Acharya", points: "233,342", rank: 3, image: "https://via.placeholder.com/100?text=Y3" },
];

const leaderboardData = [
  { name: "Nabil Akhtar", caption: "Symbiosis Institute", rank: 4, image: "https://via.placeholder.com/50?text=N" },
  { name: "Akash Patel", caption: "Shailesh J. Mehta School", rank: 5, image: "https://via.placeholder.com/50?text=A" },
  { name: "Marc Fernandes", caption: "IIT Bombay", rank: 6, image: "https://via.placeholder.com/50?text=M" },
];

export default function Rightsidebar() {
  return (
    <Rfsb>
      <div className="space-y-8">
        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white placeholder-gray-400 rounded-full p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Trending Topics Section */}
        <SectionBox>
          <p className="text-white text-2xl font-bold">What's happening</p>
          {trendingTopics.map((topic, index) => (
            <SectionItem key={index}>
              <GridWrapper>
                <UserInfo>
                  <ProfileImage>
                    <img
                      src={topic.image}
                      alt="User"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </ProfileImage>
                </UserInfo>
                <UserName>{topic.postedBy}</UserName>
                <PostTime>{topic.postedAt}</PostTime>
              </GridWrapper>
              <Content>
                <p className="text-gray-400 text-sm">{topic.category}</p>
                <p className="text-blue-500 font-bold">{topic.title}</p> {/* Bright blue */}
                <p className="text-gray-500 text-sm">{topic.subtext}</p>
                <p className="text-gray-300 mt-2">{topic.caption}</p>
              </Content>
            </SectionItem>
          ))}
          <ShowMore>Show more</ShowMore>
        </SectionBox>

        {/* Leaderboard Section */}
        <LeaderboardWrapper>
          <p className="text-white text-2xl font-bold mb-4">Leaderboard</p>
          <TopThreeWrapper>
            {topThree.map((participant, index) => (
              <TopCard key={index}>
                <ParticipantImage>
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </ParticipantImage>
                <RankBox>{participant.rank}</RankBox>
                <div className="text-blue-300 font-bold mt-2">{participant.name}</div>
                <div className="text-sm text-gray-400">{participant.points} Pts</div>
              </TopCard>
            ))}
          </TopThreeWrapper>
          <LeaderboardList>
            {leaderboardData.map((participant, index) => (
              <LeaderboardRow key={index}>
                <ParticipantImage>
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </ParticipantImage>
                <ParticipantDetails>
                  <div className="text-blue-300 font-bold">{participant.name}</div>
                  <div className="text-gray-400 text-sm">{participant.caption}</div>
                </ParticipantDetails>
                <ParticipantRank>#{participant.rank}</ParticipantRank>
              </LeaderboardRow>
            ))}
          </LeaderboardList>
        </LeaderboardWrapper>
      </div>
    </Rfsb>
  );
}
